<template>
    <p style="width: 0px;"></p>
    <font-awesome-icon icon="thumbs-up" style="display: none;" />
    <font-awesome-icon icon="thumbs-down" style="display: none;" />
</template>

<script>
import axios from 'axios'
export default {
    name: "PostComponent",
    data() {
        return {
        }
    },
    mounted() {
        // Get all post from db
        async function getProducts() {
            const response = await fetch('http://localhost:5001/api/publish/', {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("token")
                }
            })
            if (response.ok) {
                return response.json()
            }
        }
        getProducts()
            .then(function (products) {
                if (localStorage.getItem('token')) {
                    const parent = document.getElementById('view')
                    products.results.forEach(function (element) {
                        console.log(element)
                        // Card
                        const card = document.createElement('div')
                        card.classList.add('card-post')
                        parent.appendChild(card)
                        // Card content
                        const content = document.createElement('div')
                        content.classList.add('post-content')
                        card.appendChild(content)
                        // Username
                        const postUsername = document.createElement('p')
                        postUsername.innerText = '-' + ' ' + element.userName
                        content.appendChild(postUsername)
                        // Title
                        const postTitle = document.createElement('h2')
                        postTitle.innerText = element.title
                        content.appendChild(postTitle)
                        // File
                        const postImage = document.createElement('img')
                        postImage.src = element.image
                        content.appendChild(postImage)
                        // container for like and btn
                        const likeBtnContainer = document.createElement('div')
                        likeBtnContainer.id = 'likeBtnContainer'
                        content.appendChild(likeBtnContainer);
                        // div likes/dislikes
                        const likeContainer = document.createElement('div')
                        likeContainer.id = 'likeContainer'
                        likeBtnContainer.appendChild(likeContainer)
                        // like
                        let spanLike = document.createElement('span')
                        spanLike.innerHTML = '<svg color="green" class="svg-inline--fa fa-thumbs-up" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="thumbs-up" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" id="like"><path class="" fill="currentColor" d="M128 447.1V223.1c0-17.67-14.33-31.1-32-31.1H32c-17.67 0-32 14.33-32 31.1v223.1c0 17.67 14.33 31.1 32 31.1h64C113.7 479.1 128 465.6 128 447.1zM512 224.1c0-26.5-21.48-47.98-48-47.98h-146.5c22.77-37.91 34.52-80.88 34.52-96.02C352 56.52 333.5 32 302.5 32c-63.13 0-26.36 76.15-108.2 141.6L178 186.6C166.2 196.1 160.2 210 160.1 224c-.0234 .0234 0 0 0 0L160 384c0 15.1 7.113 29.33 19.2 38.39l34.14 25.59C241 468.8 274.7 480 309.3 480H368c26.52 0 48-21.47 48-47.98c0-3.635-.4805-7.143-1.246-10.55C434 415.2 448 397.4 448 376c0-9.148-2.697-17.61-7.139-24.88C463.1 347 480 327.5 480 304.1c0-12.5-4.893-23.78-12.72-32.32C492.2 270.1 512 249.5 512 224.1z"></path></svg>'
                        likeContainer.appendChild(spanLike)
                        // On click make a post request to like/:id
                        spanLike.addEventListener('click', () => {
                            axios.post('http://localhost:5001/api/publish/like/' + element.id, 1, {
                                headers: {
                                    Authorization: "Bearer " + localStorage.getItem("token")
                                }
                            })
                                .then(response => {
                                    console.log(response.data.results)
                                    location.reload()
                                })
                                .catch(error => {
                                    alert(error.response.data.message)
                                });
                        })
                        let likeText = document.createElement('p')
                        likeText.innerText = 'Likes : ' + element.likes
                        likeContainer.appendChild(likeText)
                        // dislike
                        let spanDislike = document.createElement('span')
                        spanDislike.innerHTML = '<svg color="red" class="svg-inline--fa fa-thumbs-down" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="thumbs-down" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" id="dislike"><path class="" fill="currentColor" d="M96 32.04H32c-17.67 0-32 14.32-32 31.1v223.1c0 17.67 14.33 31.1 32 31.1h64c17.67 0 32-14.33 32-31.1V64.03C128 46.36 113.7 32.04 96 32.04zM467.3 240.2C475.1 231.7 480 220.4 480 207.9c0-23.47-16.87-42.92-39.14-47.09C445.3 153.6 448 145.1 448 135.1c0-21.32-14-39.18-33.25-45.43C415.5 87.12 416 83.61 416 79.98C416 53.47 394.5 32 368 32h-58.69c-34.61 0-68.28 11.22-95.97 31.98L179.2 89.57C167.1 98.63 160 112.9 160 127.1l.1074 160c0 0-.0234-.0234 0 0c.0703 13.99 6.123 27.94 17.91 37.36l16.3 13.03C276.2 403.9 239.4 480 302.5 480c30.96 0 49.47-24.52 49.47-48.11c0-15.15-11.76-58.12-34.52-96.02H464c26.52 0 48-21.47 48-47.98C512 262.5 492.2 241.9 467.3 240.2z"></path></svg>'
                        likeContainer.appendChild(spanDislike)
                        // On click make a post request to dislike/:id
                        spanDislike.addEventListener('click', () => {
                            axios.post('http://localhost:5001/api/publish/dislike/' + element.id, 1, {
                                headers: {
                                    Authorization: "Bearer " + localStorage.getItem("token")
                                }
                            })
                                .then(response => {
                                    console.log(response.data.results)
                                    location.reload()
                                })
                                .catch(error => {
                                    alert(error.response.data.message)
                                });
                        })
                        let dislikeText = document.createElement('p')
                        dislikeText.innerText = 'Dislikes : ' + element.dislikes
                        likeContainer.appendChild(dislikeText)
                        // div btn
                        const btnContainer = document.createElement('div')
                        btnContainer.id = 'btnContainer'
                        likeBtnContainer.appendChild(btnContainer)
                        // btn modif
                        const btn = document.createElement('button')
                        btn.id = 'modify'
                        btn.innerText = 'Modifier'
                        btnContainer.appendChild(btn)
                        btn.addEventListener('click', (e) => {
                            e.preventDefault()
                            location.replace(location.origin + "/#/" + element.id)
                        })
                        // btn delete
                        const btnDelete = document.createElement('button')
                        btnDelete.id = 'delete'
                        btnDelete.innerText = 'Supprimer'
                        btnContainer.appendChild(btnDelete)
                        // On click make a delete request to delete/:id
                        btnDelete.addEventListener('click', (e) => {
                            e.preventDefault()
                            axios.delete('http://localhost:5001/api/publish/delete/' + element.id, {
                                headers: {
                                    Authorization: "Bearer " + localStorage.getItem("token")
                                }
                            })
                                .then(response => {
                                    console.log(response)
                                    location.reload()
                                })
                                .catch(error => {
                                    console.log(error)
                                });
                        })
                        // get userId by get request to profile
                        axios.get('http://localhost:5001/api/auth/profile', {
                            headers: {
                                Authorization: "Bearer " + localStorage.getItem("token")
                            }
                        })
                            // if id correspond to a post or user isAdmin = true display all the button
                            .then(response => {
                                if (response.data[0].id === element.userId || response.data[0].isAdmin == true) {
                                    console.log('Accés autorisé.')
                                }
                                else {
                                    btn.style.display = 'none'
                                    btnDelete.style.display = 'none'
                                }
                            }
                            )
                            .catch(error => console.log(error))
                        //
                    })
                } else {
                    location.replace(location.origin + "/#/login")
                }
            })
    },
    methods: {
    },
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
.card-post {
    box-shadow: 2px 2px 7px 1px rgba(0, 0, 0, 0.342);
    background-color: #FFD7D7;
    border-radius: 5px;
    width: 80%;
    height: 440px;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-bottom: 15px;
    margin-top: 20px;

    .post-content {
        padding-top: 15px;
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 80%;

        img {
            height: 330px;
            width: 100%;
            border: 2px solid #00000041;
            border-radius: 5px;
        }

        p {
            width: 100%;
            margin: 0;
            font-size: 1.05em;
            color: black;
        }

        h2 {
            width: 100%;
            font-size: 1.15em;
            color: black;
            margin: 0;
            margin-bottom: 5px;
            font-weight: 600;
        }

        #likeContainer {
            align-self: flex-start;
            display: flex;
            align-items: center;

            p {
                font-size: 0.98em;
                width: 85px;
                margin-left: 8px;
            }

            span {
                font-size: 1.2em;
            }

            span:hover {
                cursor: pointer;
            }
        }

        #likeBtnContainer {
            display: flex;
            margin-top: 15px;
            padding-top: 5px;
            border-top: solid 1.5px rgba(0, 0, 0, 0.397);
            width: 100%;

            #btnContainer {
                align-self: flex-end;

                button {
                    border-radius: 5px;
                    border: 2px solid #4E5166;
                    height: 25px;
                    transition: 0.7s;
                }

                button:hover {
                    cursor: pointer;
                    border-color: #FD2D01;
                }

                #modify {
                    margin-right: 20px;
                    margin-left: 30px;
                }
            }
        }
    }
}

@media only screen and (min-width: 551px) and (max-width: 691px) {
    #view {
        .post {
            form {
                width: 80%;
            }
        }
    }

    .card-post {
        height: 400px;
        width: 80%;

        .post-content {
            width: 90%;

            img {
                height: 250px;
                width: 100%;
            }

            #likeContainer {
                align-self: center;
            }

            #likeBtnContainer {
                flex-direction: column;

                #btnContainer {
                    margin-top: 5px;
                    align-self: center;

                    #modify {
                        margin-left: 0px;
                        margin-right: 50px;
                    }
                }
            }
        }
    }
}

@media only screen and (min-width: 320px) and (max-width: 551px) {
    #view {
        .post {
            form {
                width: 100%;
            }
        }
    }

    .card-post {
        height: 400px;
        width: 100%;

        .post-content {
            width: 90%;

            img {
                height: 250px;
                width: 100%;
            }

            #likeContainer {
                align-self: center;
            }

            #likeBtnContainer {
                flex-direction: column;

                #btnContainer {
                    margin-top: 5px;
                    align-self: center;

                    #modify {
                        margin-left: 0px;
                        margin-right: 50px;
                    }
                }
            }
        }
    }
}
</style>
