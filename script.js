document.addEventListener("DOMContentLoaded", () => {
    function addReplyInput(commentElement) {
        const replyBox = document.createElement('div');
        replyBox.classList.add('reply-box');
        replyBox.innerHTML = `
            <textarea class="reply-input" rows="3" placeholder="Write your reply..."></textarea>
            <button class="submit-reply-btn">Submit Reply</button>
        `;
        commentElement.appendChild(replyBox);

        replyBox.querySelector('.submit-reply-btn').addEventListener('click', () => {
            const replyText = replyBox.querySelector('.reply-input').value.trim();
            if (replyText) {
                const newReply = document.createElement('li');
                newReply.innerHTML = `
                    <article class="comment">
                        <aside class="avatar">
                            <img src="https://i.pravatar.cc/50" alt="">
                            <div class="name">Replier</div>
                        </aside>
                        <div class="comment-content">${replyText}</div>
                        <div class="reply">
                            <a href="#reply" data-reply-button title="Reply to this comment">+</a>
                        </div>
                    </article>
                    <ol class="replies"></ol>
                `;
                const repliesList = commentElement.querySelector('.replies') || document.createElement('ol');
                repliesList.classList.add('replies');
                repliesList.appendChild(newReply);
                commentElement.appendChild(repliesList);
                replyBox.remove();
                attachReplyEvent(newReply.querySelector('.reply a'));
            }
        });
    }

    function attachReplyEvent(button) {
        button.addEventListener('click', (event) => {
            event.preventDefault();
            const commentElement = button.closest('li');
            const existingReplyBox = commentElement.querySelector('.reply-box');
            if (existingReplyBox) {
                existingReplyBox.remove();
            } else {
                addReplyInput(commentElement);
            }
        });
    }
    document.querySelectorAll('[data-reply-button]').forEach(attachReplyEvent);

    function addNewCommentInput() {
        const newCommentContainer = document.createElement('div');
        newCommentContainer.id = 'new-comment-container';
        
        const newCommentInput = document.createElement('textarea');
        newCommentInput.id = 'new-comment-input';
        newCommentInput.rows = 3;
        newCommentInput.placeholder = 'Write your comment here...';
        
        const submitCommentBtn = document.createElement('button');
        submitCommentBtn.id = 'submit-comment-btn';
        submitCommentBtn.innerText = 'Submit Comment';
        
        newCommentContainer.appendChild(newCommentInput);
        newCommentContainer.appendChild(submitCommentBtn);
        document.querySelector('.page-container').appendChild(newCommentContainer);

        submitCommentBtn.addEventListener('click', () => {
            const commentText = newCommentInput.value.trim();
            if (commentText) {
                const newComment = document.createElement('li');
                newComment.innerHTML = `
                    <article class="comment">
                        <aside class="avatar">
                            <img src="https://i.pravatar.cc/50" alt="">
                            <div class="name">New User</div>
                        </aside>
                        <div class="comment-content">${commentText}</div>
                        <div class="reply">
                            <a href="#reply" data-reply-button title="Reply to this comment">+</a>
                        </div>
                    </article>
                    <ol class="replies"></ol>
                `;
                document.querySelector('.comments').appendChild(newComment);
                newCommentContainer.remove();
                attachReplyEvent(newComment.querySelector('.reply a'));
            }
        });
    }

    document.getElementById('add-comment-btn').addEventListener('click', addNewCommentInput);
});
