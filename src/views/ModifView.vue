<template>
    <div id="wrapper">
        <div class="container">
            <div id="post-container">
                <h2></h2>
                <img />
            </div>
            <form enctype="multipart/form-data" class="upload">
                <label for="title">Nouveau titre :</label>
                <input type="text" name="title" id="title" placeholder="Nouveau titre de votre post..."
                    v-model="modifPostValue.title" />
                <!-- On change use getFile methods-->
                <label for="uploadFile">Nouvelle image :</label>
                <input @change="getFile" type="file" name="file" id="uploadFile">
                <div id="btn-container">
                    <!-- On click use publish or cancel methods-->
                    <button @click.prevent="Publish" id="file" type="submit">Mettre à jour</button>
                    <button @click.prevent="Cancel" id="cancel"> Annuler</button>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
export default {
    name: "ModifView",
    data() {
        return {
            modifPostValue: {
                title: null,
                file: null,
            },
            error: ""
        };
    },
    mounted() {
        // Get post id from url
        let params = new URL(document.location);
        let hash = params.hash;
        let id = hash.slice('2');
        // Make a get request to publish to display get only one post 
        async function getOneProduct() {
            const response = await fetch('http://localhost:5001/api/publish/' + id, {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("token")
                }
            })
            // if response.ok log it
            if (response.ok) {
                return response.json();
                // else go back to mainpage
            } else {
                location.replace(location.origin)
            }
        }
        // Create the post html element and insert informations into it
        getOneProduct()
            .then(function (products) {
                products.results1.forEach(function (element) {
                    console.log(element)
                    // title
                    let title = document.getElementsByTagName('h2');
                    title[0].innerText = (element.title);
                    // file
                    let file = document.getElementsByTagName('img');
                    file[1].src = element.image
                    file[1].alt = "L'image actuelle du post"
                })
            })
    },
    methods: {
        // Cancel : back to mainpage
        Cancel() {
            location.replace(location.origin)
        },
        // getFile : Get files and insert it into modifPostValue.file
        getFile(event) {
            this.modifPostValue.file = event.target.files[0];
            console.log(this.modifPostValue.file)
        },
        Publish() {
            // Get post id from url
            let params = new URL(document.location);
            let hash = params.hash;
            let id = hash.slice('2');
            // Create formData
            const formData = new FormData();
            // insert title/file/id values into
            formData.append("title", this.modifPostValue.title);
            formData.append("file", this.modifPostValue.file);
            formData.append("postId", id);
            // If title and file is empty
            if (formData.get("title") == "null" && formData.get("file") == "null") {
                // send alert
                alert("L'un des champs lors de la création de votre post est vide.")
                // Else
            } else {
                // Make a put request to modify
                axios.put("http://localhost:5001/api/publish/modify", formData, {
                    headers: {
                        Authorization: "Bearer " + localStorage.getItem("token")
                    },
                })
                // and reload page to display new post value
                location.reload()
            }
        }
    }
}
</script>

<style scoped lang="scss">
@font-face {
    font-family: SalmaproMedium;
    src: url("../assets/SalmaproMedium-0Wooo.otf") format("opentype");
}

@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@500&display=swap');

* {
    font-family: SalmaproMedium;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
}

#wrapper {
    height: 90%;
    display: flex;
    justify-content: center;
    align-items: center;
}

.container {
    background-color: #FFD7D7;
    height: 575px;
    width: 41em;
    border-radius: 7px;

    #post-container {
        display: flex;
        flex-direction: column;
        height: 410px;
        align-items: center;
        justify-content: center;

        h2 {
            margin: 0;
            padding-bottom: 15px;
        }

        img {
            width: 70%;
            height: 349px;
            min-width: 400px;
        }
    }

    form {
        border-top: 2px solid #2c3e50;
        display: flex;
        flex-direction: column;
        height: 150px;
        margin-left: 84px;
        margin-right: 84px;
        justify-content: center;
        align-items: center;

        label {
            align-self: start;
            margin-left: 95px;
        }

        #title {
            width: 300px;
            height: 25px;
            border-radius: 7px;
            outline: none;
            border: 2px solid #4E5166;
            padding-left: 10px;
            margin-bottom: 4px;
        }

        #title:focus {
            border: 2px solid #fd2b01d0;
        }

        #uploadFile {
            width: 248px;
            margin-right: 65px;
        }

        #btn-container {
            margin-top: 10px;
            width: 62%;
            height: 40px;
            display: flex;
            justify-content: space-between;

            #cancel,
            #file {
                border-radius: 7px;
                width: 100px;
            }

            #cancel:hover,
            #file:hover {
                cursor: pointer;
                background-color: #95a09475;
            }

            #cancel {
                border: 2px solid #D1515A;
            }

            #file {
                border: 2px solid green;
            }
        }
    }
}
</style>