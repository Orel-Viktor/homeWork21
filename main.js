"use strict";

const FindPost = function ({
    form,
    inputID,
    btnSend,
    userIdPost,
    idPost,
    titlePost,
    bodyPost,
    commentsPost,
    infoPost,
}) {
    const myForm = document.querySelector(form);
    const idInput = document.querySelector(inputID);
    const sendBtn = document.querySelector(btnSend);
    const postUserId = document.querySelector(userIdPost);
    const posId = document.querySelector(idPost);
    const postTitle = document.querySelector(titlePost);
    const postBody = document.querySelector(bodyPost);
    const postComments = document.querySelector(commentsPost);
    const postInfo = document.querySelector(infoPost);

    myForm.addEventListener("submit", (event) => {
        event.preventDefault();
        event.target.reset()
        
    });

    this.checkID = () => {
        idInput.addEventListener("input", () => {
            this.idValue = idInput.value;
        });
    };
    this.findId = function () {
        this.checkID();
        sendBtn.addEventListener("click", () => {
            fetch(`https://jsonplaceholder.typicode.com/posts?id=${this.idValue}`)
                .then((response) => response.json())
                .then((data) => {
                    postUserId.innerText = `UserId: ` + data.map((elem) => elem.userId);
                    posId.innerText = `Id: ` + data.map((elem) => elem.id);
                    postBody.innerText = `Body: ` + data.map((elem) => elem.body);
                    postTitle.innerText = `Title: ` + data.map((elem) => elem.title);
                })
        });
        this.openComments();
    };
    this.openComments = () => {
        this.openCommentsBtn = document.createElement("button");
        postInfo.appendChild(this.openCommentsBtn).innerText = "Open Comments";
        this.openCommentsBtn.addEventListener("click", () => {
            this.closeComment();
            this.createCommentElements();
            fetch(
                `https://jsonplaceholder.typicode.com/post/${this.idValue}/comments`
            )
                .then((response) => response.json())
                .then((data) => {
                    this.userName.innerText = `Name: ` + data.map((elem) => elem.name);
                    this.userEmail.innerText = `Email: ` + data.map((elem) => elem.email);
                    this.userBody.innerText = `Body: ` + data.map((elem) => elem.body);
                });
        });
    };

    this.closeComment = () => {
        this.openCommentsBtn.setAttribute("disabled", "disabled");
        this.closeCommentsBtn = document.createElement("button");
        postInfo.appendChild(this.closeCommentsBtn).innerText = "Close Comments";
        this.closeCommentsBtn.addEventListener("click", () => {
            this.openCommentsBtn.removeAttribute("disabled", "disabled");
            this.closeCommentsBtn.remove();
            this.clearElements()
        });
    };

    this.clearElements = () => {
        this.userName.remove();
        this.userEmail.remove();
        this.userBody.remove();
    }

    this.createCommentElements = () => {
        this.userName = document.createElement("div");
        this.userEmail = document.createElement("div");
        this.userBody = document.createElement("div");
        postComments.appendChild(this.userName);
        postComments.appendChild(this.userEmail);
        postComments.appendChild(this.userBody);
    };
};

const findPost = new FindPost({
    form: ".js--form",
    inputID: ".js--input-id",
    btnSend: ".js--btn-send",
    userIdPost: ".js--user-id-post",
    idPost: ".js--id-post",
    titlePost: ".js--title-post",
    bodyPost: ".js--body-post",
    commentsPost: ".js--comments-post",
    infoPost: ".js--info-post",
});
findPost.findId();
