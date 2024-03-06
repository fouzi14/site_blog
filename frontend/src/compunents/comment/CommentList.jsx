import "./commentlist.css"
import swal from 'sweetalert';

export default function CommentList() {
    
    const deletecomment=()=>{
        swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this imaginary file!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          })
          .then((willDelete) => {
            if (willDelete) {
              swal("comment has been deleted!", {
                icon: "success",
              });
            } else {
              swal("somthing went wrong!");
            }
          });
    }

  return (
    <div className="comment_list">
        <h4 className="comment_list_count"> 2 comments</h4>
        {[1,2,3].map(comment =>(
            <div className="comment_item">
                <div className="comment_item_info">
                    <div className="comment_item_username">
                        laouzi abdelkader
                    </div>
                    <div className="comment_item_time">
                        2 hour ago
                    </div>
                </div>
                <p className="comment_item_text">
                    hello this is amazing
                </p>
                <div className="comment_item_icon_wrapper">
                    <i className="bi bi-pencil-square"></i>
                    <i onClick={deletecomment} className="bi bi-trash-fill"></i>
                </div>
            </div>
        )
        )}
    </div>
  )
}
