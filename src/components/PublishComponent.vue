<template>
    <div class="post">
        <form enctype="multipart/form-data" class="upload">
            <label for="title">Envie de partager un gif ? :</label>
            <input type="text" name="title" id="title" placeholder="Titre de votre post..." v-model="postValue.title">
            <!-- On change user getFile methods-->
            <label for="uploadFile" style="margin:0px;">Choisir une image : </label>
            <input @change="getFile" type="file" name="file" id="uploadFile">
            <!-- On click use Publish methods-->
            <button @click.prevent="Publish" id="file" type="submit">Publier !</button>
        </form>
    </div>
</template>

<script>
import axios from 'axios'
export default {
    name: "PublishComponent",
    data() {
        return {
            postValue: {
                title: null,
                file: null,
            },
            error: ""
        };
    },
    methods: {
        // get files and insert value into postValue.file
        getFile(event) {
            this.postValue.file = event.target.files[0];
            console.log(this.postValue.file)
        },
        // Create formData
        Publish() {
            const formData = new FormData();
            // Insert title and file into fd
            formData.append("title", this.postValue.title);
            formData.append("file", this.postValue.file);
            // If title or file empty send alert
            if (formData.get("title") == "null" || formData.get("file") == "null") {
                alert("L'un des champs lors de la création de votre post est vide.")
                // Else make a post request to create and send formdata
            } else {
                axios.post("http://localhost:5001/api/publish/create", formData, {
                    headers: {
                        Authorization: "Bearer " + localStorage.getItem("token")
                    }
                })
                // If response is ok reload
                    .then(response => {
                        if (response) {
                            window.location.reload();
                        }
                    })
                    .catch(err => this.error = err)
            }
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.post {
    margin-top: 20px;
    width: 100%;
    height: 170px;
    display: flex;
    justify-content: center;

    form {
        box-shadow: 2px 2px 7px 1px rgba(0, 0, 0, 0.342);
        display: flex;
        align-items: center;
        flex-direction: column;
        border-radius: 5px;
        width: 80%;
        height: 180px;
        background-color: #FFD7D7;

        label {
            margin-top: 18px;
            width: 53%;
            min-width: 220px;
            color: black;
            margin-top: 12px;
            margin-bottom: 5px;
        }

        #title {
            width: 50%;
            min-width: 220px;
            height: 35px;
            border-radius: 7px;
            outline: none;
            border: 2px solid #4E5166;
            padding-left: 10px;
            transition: 0.7s;
        }
        #title:focus{
            border: 2px solid #fd2b01d0;
        }
        #uploadFile {
            margin-top: 7px;
            height: 25px;
            color: black;
            border-radius: 5px;
            width: 52%;
        }
        #file {
            border-radius: 5px;
            border: 2px solid #4E5166;
            margin-top: 7px;
            width: 100px;
            height: 30px;
            transition: 0.7s;
        }
        #file:hover{
            cursor: pointer;
            border: 2px solid #FD2D01;
        }

    }
}
</style>
