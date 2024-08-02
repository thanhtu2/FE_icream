// import React, { useState, useEffect } from 'react';
// import { Button, Card, Modal, Form } from 'react-bootstrap';
// import { useDispatch, useSelector } from 'react-redux';
// import { addToCart } from '../redux/slices/cartSlice';
// import { toast } from 'react-toastify';
// import axios from 'axios';
// import '../style/ProductCard.css';

// // Component để hiển thị đánh giá bằng sao
// const StarRating = ({ rating }) => {
//   const stars = Array(5).fill(false).map((_, index) => index < rating);

//   return (
//     <div>
//       {stars.map((filled, index) => (
//         <span key={index} style={{ color: filled ? 'gold' : 'grey' }}>★</span>
//       ))}
//     </div>
//   );
// };

// const ProductCard = ({ product }) => {
//   const dispatch = useDispatch();
//   const [show, setShow] = useState(false);
//   const [comments, setComments] = useState([]);
//   const [users, setUsers] = useState({});
//   const [error, setError] = useState('');
//   const [replyText, setReplyText] = useState(''); // Nội dung trả lời
//   const [replyToCommentId, setReplyToCommentId] = useState(null); // CommentID để trả lời
//   const { user, token } = useSelector((state) => state.auth);

//   const handleAddToCart = () => {
//     if (user && token) {
//       dispatch(addToCart(product));
//       toast.success(`${product.Name} đã được thêm vào giỏ hàng`, {
//         position: "top-right",
//         autoClose: 3000,
//         hideProgressBar: false,
//         closeOnClick: true,
//         pauseOnHover: true,
//         draggable: true,
//         progress: undefined,
//       });
//     } else {
//       toast.warn('Bạn cần đăng nhập để thêm sản phẩm vào giỏ hàng.', {
//         position: "top-right",
//         autoClose: 3000,
//         hideProgressBar: false,
//         closeOnClick: true,
//         pauseOnHover: true,
//         draggable: true,
//         progress: undefined,
//       });
//     }
//   };

//   const handleClose = () => setShow(false);
//   const handleShow = () => setShow(true);

//   useEffect(() => {
//     const fetchComments = async () => {
//       try {
//         const response = await axios.get(`http://localhost:4000/comments/${product.ProductID}`);
//         setComments(response.data.filter(comment => !comment.IsHidden)); // Chỉ lấy những bình luận không bị ẩn
//       } catch (err) {
//         console.error('Lỗi khi lấy comments:', err);
//         setError('Không thể lấy comments. Vui lòng thử lại sau.');
//       }
//     };

//     const fetchUsers = async () => {
//       try {
//         const response = await axios.get('http://localhost:4000/users');
//         const usersData = response.data.reduce((acc, user) => {
//           acc[user.CustomerID] = { FirstName: user.FirstName, LastName: user.LastName };
//           return acc;
//         }, {});
//         setUsers(usersData);
//       } catch (err) {
//         console.error('Lỗi khi lấy người dùng:', err);
//         setError('Không thể lấy thông tin người dùng. Vui lòng thử lại sau.');
//       }
//     };

//     fetchComments();
//     fetchUsers();
//   }, [product.ProductID]);

//   const handleHideComment = async (commentId) => {
//     try {
//       if (user && user.isAdmin) {
//         await axios.post(`http://localhost:4000/comments/hide/${commentId}`, {}, {
//           headers: {
//             Authorization: `Bearer ${token}`
//           }
//         });
//         // Cập nhật lại danh sách bình luận
//         setComments(comments.filter(comment => comment.CommentID !== commentId));
//         toast.success('Bình luận đã được ẩn thành công', {
//           position: "top-right",
//           autoClose: 3000,
//           hideProgressBar: false,
//           closeOnClick: true,
//           pauseOnHover: true,
//           draggable: true,
//           progress: undefined,
//         });
//       } else {
//         toast.error('Bạn không có quyền để ẩn bình luận.', {
//           position: "top-right",
//           autoClose: 3000,
//           hideProgressBar: false,
//           closeOnClick: true,
//           pauseOnHover: true,
//           draggable: true,
//           progress: undefined,
//         });
//       }
//     } catch (err) {
//       console.error('Lỗi khi ẩn bình luận:', err);
//       toast.error('Không thể ẩn bình luận. Vui lòng thử lại sau.', {
//         position: "top-right",
//         autoClose: 3000,
//         hideProgressBar: false,
//         closeOnClick: true,
//         pauseOnHover: true,
//         draggable: true,
//         progress: undefined,
//       });
//     }
//   };

//   const handleReplyChange = (e) => setReplyText(e.target.value); // Sửa thành setReplyText

//   const handleReplySubmit = async (e) => {
//     e.preventDefault();
//     if (replyToCommentId && replyText) { // Sửa thành replyToCommentId và replyText
//       if (!user || !user.CustomerID) {
//         toast.warn('Bạn cần đăng nhập để gửi bình luận trả lời.', {
//           position: "top-right",
//           autoClose: 3000,
//           hideProgressBar: false,
//           closeOnClick: true,
//           pauseOnHover: true,
//           draggable: true,
//           progress: undefined,
//         });
//         return;
//       }

//       try {
//         await axios.post(`http://localhost:4000/comments/reply/${replyToCommentId}`, { // Sửa thành replyToCommentId
//           ProductID: product.ProductID,
//           CustomerID: user.CustomerID,
//           Comment: replyText,
//           Rating: 0 // Có thể thay đổi tùy thuộc vào yêu cầu
//         }, {
//           headers: {
//             Authorization: `Bearer ${token}`
//           }
//         });
//         setComments([...comments, { 
//           CommentID: Date.now(), 
//           CustomerID: user.CustomerID, 
//           Comment: replyText, // Sửa thành replyText
//           Rating: 0, // Có thể thay đổi tùy thuộc vào yêu cầu
//           CommentDate: new Date(), // Thêm ngày bình luận
//           ParentCommentID: replyToCommentId // Sửa thành replyToCommentId
//         }]);
//         setReplyText(''); // Xóa nội dung trả lời
//         setReplyToCommentId(null); // Xóa CommentID để trả lời
//         toast.success('Trả lời bình luận thành công', {
//           position: "top-right",
//           autoClose: 3000,
//           hideProgressBar: false,
//           closeOnClick: true,
//           pauseOnHover: true,
//           draggable: true,
//           progress: undefined,
//         });
//       } catch (err) {
//         console.error('Lỗi khi gửi bình luận trả lời:', err);
//         toast.error('Không thể gửi bình luận trả lời. Vui lòng thử lại sau.', {
//           position: "top-right",
//           autoClose: 3000,
//           hideProgressBar: false,
//           closeOnClick: true,
//           pauseOnHover: true,
//           draggable: true,
//           progress: undefined,
//         });
//       }
//     } else {
//       toast.warn('Vui lòng nhập nội dung bình luận và chọn bình luận để trả lời.', {
//         position: "top-right",
//         autoClose: 3000,
//         hideProgressBar: false,
//         closeOnClick: true,
//         pauseOnHover: true,
//         draggable: true,
//         progress: undefined,
//       });
//     }
//   };

//   return (
//     <>
//       <Card className="product-card">
//         <Card.Img variant="top" src={product.ImagePath} />
//         <Card.Body>
//           <Card.Title>{product.Name}</Card.Title>
//           <Card.Text>{product.Description}</Card.Text>
//           <Card.Text>{product.Price} VND</Card.Text>
//           <Button variant="primary" onClick={handleAddToCart}>Add to Cart</Button>
//           <Button variant="secondary" onClick={handleShow} className="ms-2">Xem Chi Tiết</Button>
//         </Card.Body>
//       </Card>

//       <Modal show={show} onHide={handleClose} size="lg">
//         <Modal.Header closeButton>
//           <Modal.Title>{product.Name}</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <img src={product.ImagePath} alt={product.Name} className="modal-img" />
//           <p><strong>Description:</strong> {product.Description}</p>
//           <p><strong>Price:</strong> {product.Price} VND</p>
//           <p><strong>Stock:</strong> {product.Stock} units</p>
//           <p><strong>ProductID:</strong> {product.ProductID}</p>
//           <hr />
//           <h5>Comments:</h5>
//           {error && <p className="text-danger">{error}</p>}
//           {comments.length > 0 ? (
//             <ul>
//               {comments.map((comment) => (
//                 <li key={comment.CommentID}>
//                   <p><strong>{users[comment.CustomerID]?.FirstName} {users[comment.CustomerID]?.LastName}:</strong> {comment.Comment}</p>
//                   <StarRating rating={comment.Rating} />
//                   {user && user.isAdmin && (
//                     <Button variant="danger" onClick={() => handleHideComment(comment.CommentID)}>
//                       Hide Comment
//                     </Button>
//                   )}
//                   {user && (
//                     <Button variant="link" onClick={() => setReplyToCommentId(comment.CommentID)}>
//                       Reply
//                     </Button>
//                   )}
//                   {replyToCommentId === comment.CommentID && (
//                     <Form onSubmit={handleReplySubmit}>
//                       <Form.Group controlId="replyText">
//                         <Form.Control
//                           type="text"
//                           placeholder="Type your reply here..."
//                           value={replyText}
//                           onChange={handleReplyChange}
//                         />
//                       </Form.Group>
//                       <Button variant="primary" type="submit">
//                         Submit Reply
//                       </Button>
//                     </Form>
//                   )}
//                 </li>
//               ))}
//             </ul>
//           ) : (
//             <p>No comments yet.</p>
//           )}
//         </Modal.Body>
//         <Modal.Footer>
//           <Button variant="secondary" onClick={handleClose}>
//             Close
//           </Button>
//           <Button variant="primary" onClick={() => { handleAddToCart(); handleClose(); }}>
//             Thêm vào giỏ hàng
//           </Button>
//         </Modal.Footer>
//       </Modal>
//     </>
//   );
// };

// export default ProductCard;
import React, { useState, useEffect } from 'react';
import { Button, Card, Modal, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../redux/slices/cartSlice';
import { toast } from 'react-toastify';
import axios from 'axios';
import '../style/ProductCard.css';

// Component để hiển thị đánh giá bằng sao
const StarRating = ({ rating }) => {
  const stars = Array(5).fill(false).map((_, index) => index < rating);

  return (
    <div>
      {stars.map((filled, index) => (
        <span key={index} style={{ color: filled ? 'gold' : 'grey' }}>★</span>
      ))}
    </div>
  );
};

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const [comments, setComments] = useState([]);
  const [users, setUsers] = useState({});
  const [error, setError] = useState('');
  const [replyText, setReplyText] = useState(''); // Nội dung trả lời
  const [replyToCommentId, setReplyToCommentId] = useState(null); // CommentID để trả lời
  const [newCommentText, setNewCommentText] = useState(''); // Nội dung bình luận mới
  const { user, token } = useSelector((state) => state.auth);

  const handleAddToCart = () => {
    if (user && token) {
      dispatch(addToCart(product));
      toast.success(`${product.Name} đã được thêm vào giỏ hàng`, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
      toast.warn('Bạn cần đăng nhập để thêm sản phẩm vào giỏ hàng.', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/comments/${product.ProductID}`);
        setComments(response.data.filter(comment => !comment.IsHidden)); // Chỉ lấy những bình luận không bị ẩn
      } catch (err) {
        console.error('Lỗi khi lấy comments:', err);
        setError('Không thể lấy comments. Vui lòng thử lại sau.');
      }
    };

    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:4000/users');
        const usersData = response.data.reduce((acc, user) => {
          acc[user.CustomerID] = { FirstName: user.FirstName, LastName: user.LastName };
          return acc;
        }, {});
        setUsers(usersData);
      } catch (err) {
        console.error('Lỗi khi lấy người dùng:', err);
        setError('Không thể lấy thông tin người dùng. Vui lòng thử lại sau.');
      }
    };

    fetchComments();
    fetchUsers();
  }, [product.ProductID]);

  const handleHideComment = async (commentId) => {
    try {
      if (user && user.isAdmin) {
        await axios.post(`http://localhost:4000/comments/hide/${commentId}`, {}, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        // Cập nhật lại danh sách bình luận
        setComments(comments.filter(comment => comment.CommentID !== commentId));
        toast.success('Bình luận đã được ẩn thành công', {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      } else {
        toast.error('Bạn không có quyền để ẩn bình luận.', {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    } catch (err) {
      console.error('Lỗi khi ẩn bình luận:', err);
      toast.error('Không thể ẩn bình luận. Vui lòng thử lại sau.', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  const handleReplyChange = (e) => setReplyText(e.target.value); // Sửa thành setReplyText

  const handleReplySubmit = async (e) => {
    e.preventDefault();
    if (replyToCommentId && replyText) { // Sửa thành replyToCommentId và replyText
      if (!user || !user.CustomerID) {
        toast.warn('Bạn cần đăng nhập để gửi bình luận trả lời.', {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        return;
      }

      try {
        await axios.post(`http://localhost:4000/comments/reply/${replyToCommentId}`, { // Sửa thành replyToCommentId
          ProductID: product.ProductID,
          CustomerID: user.CustomerID,
          Comment: replyText,
          Rating: 0 // Có thể thay đổi tùy thuộc vào yêu cầu
        }, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setComments([...comments, { 
          CommentID: Date.now(), 
          CustomerID: user.CustomerID, 
          Comment: replyText, // Sửa thành replyText
          Rating: 0, // Có thể thay đổi tùy thuộc vào yêu cầu
          CommentDate: new Date(), // Thêm ngày bình luận
          ParentCommentID: replyToCommentId // Sửa thành replyToCommentId
        }]);
        setReplyText(''); // Xóa nội dung trả lời
        setReplyToCommentId(null); // Xóa CommentID để trả lời
        toast.success('Trả lời bình luận thành công', {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      } catch (err) {
        console.error('Lỗi khi gửi bình luận trả lời:', err);
        toast.error('Không thể gửi bình luận trả lời. Vui lòng thử lại sau.', {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    } else {
      toast.warn('Vui lòng nhập nội dung bình luận và chọn bình luận để trả lời.', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  const handleNewCommentChange = (e) => setNewCommentText(e.target.value);

  const handleNewCommentSubmit = async (e) => {
    e.preventDefault();
    if (newCommentText) {
      if (!user || !user.CustomerID) {
        toast.warn('Bạn cần đăng nhập để gửi bình luận.', {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        return;
      }

      try {
        await axios.post('http://localhost:4000/comments', {
          ProductID: product.ProductID,
          CustomerID: user.CustomerID,
          Comment: newCommentText,
          Rating: 0, // Có thể thay đổi tùy thuộc vào yêu cầu
          CommentDate: new Date(), // Thêm ngày bình luận
          IsHidden: false // Bình luận không bị ẩn
        }, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setComments([...comments, { 
          CommentID: Date.now(), 
          CustomerID: user.CustomerID, 
          Comment: newCommentText,
          Rating: 0, // Có thể thay đổi tùy thuộc vào yêu cầu
          CommentDate: new Date(),
          ParentCommentID: null // Bình luận không có comment cha
        }]);
        setNewCommentText('');
        toast.success('Bình luận đã được thêm thành công', {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      } catch (err) {
        console.error('Lỗi khi gửi bình luận:', err);
        toast.error('Không thể gửi bình luận. Vui lòng thử lại sau.', {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    } else {
      toast.warn('Vui lòng nhập nội dung bình luận.', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  return (
    <>
      <Card className="product-card">
        <Card.Img variant="top" src={product.ImagePath} />
        <Card.Body>
          <Card.Title>{product.Name}</Card.Title>
          <Card.Text>{product.Description}</Card.Text>
          <Card.Text>{product.Price} VND</Card.Text>
          <Button variant="primary" onClick={handleAddToCart}>Add to Cart</Button>
          <Button variant="secondary" onClick={handleShow} className="ms-2">Xem Chi Tiết</Button>
        </Card.Body>
      </Card>

      <Modal show={show} onHide={handleClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>{product.Name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <img src={product.ImagePath} alt={product.Name} className="modal-img" />
          <p><strong>Description:</strong> {product.Description}</p>
          <p><strong>Price:</strong> {product.Price} VND</p>
          <p><strong>Stock:</strong> {product.Stock} units</p>
          {/* <p><strong>ProductID:</strong> {product.ProductID}</p> */}
          <hr />
          <h5>Comments:</h5>
          {error && <p className="text-danger">{error}</p>}
          {comments.length > 0 ? (
            <ul>
              {comments.map((comment) => (
                <li key={comment.CommentID}>
                  <p><strong>{users[comment.CustomerID]?.FirstName} {users[comment.CustomerID]?.LastName}:</strong> {comment.Comment}</p>
                  <StarRating rating={comment.Rating} />
                  {user && user.isAdmin && (
                    <Button variant="danger" onClick={() => handleHideComment(comment.CommentID)}>
                      Hide Comment
                    </Button>
                  )}
                  {user && (
                    <Button variant="link" onClick={() => setReplyToCommentId(comment.CommentID)}>
                      Reply
                    </Button>
                  )}
                  {replyToCommentId === comment.CommentID && (
                    <Form onSubmit={handleReplySubmit}>
                      <Form.Group controlId="replyText">
                        <Form.Control
                          type="text"
                          placeholder="Type your reply here..."
                          value={replyText}
                          onChange={handleReplyChange}
                        />
                      </Form.Group>
                      <Button variant="primary" type="submit">
                        Submit Reply
                      </Button>
                    </Form>
                  )}
                </li>
              ))}
            </ul>
          ) : (
            <p>No comments yet.</p>
          )}
          {user && (
            <Form onSubmit={handleNewCommentSubmit} className="mt-3">
              <Form.Group controlId="newCommentText">
                <Form.Control
                  type="text"
                  placeholder="Type your comment here..."
                  value={newCommentText}
                  onChange={handleNewCommentChange}
                />
              </Form.Group>
              <Button variant="primary" type="submit" className="mt-2">
                Submit Comment
              </Button>
            </Form>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={() => { handleAddToCart(); handleClose(); }}>
            Thêm vào giỏ hàng
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ProductCard;
