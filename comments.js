class Comment {
    constructor(author_id, author, message){
        this.author_id = author_id;
        this.author = author;
        this.message = message;
        this.likes = 0;
        this.dislikes = 0;
        this.liked = false;
        this.disliked = false;
        this.created_at = Date.now();
    }

    setLiked(){
        this.liked = !this.liked;

        if(this.liked) this.likes++;
        else this.likes--;

        if(this.disliked) {
            this.dislikes--;
            this.disliked = false;
        }
    }
    
    setDisLiked(){
        this.disliked = !this.disliked;

        if(this.disliked) this.dislikes++;
        else this.dislikes--;

        if(this.liked) {
            this.likes--;
            this.liked = false;
        }
    }
}

new Vue({
    el: '#app',
    template: `
        <div class="container-fluid">
            <div>
                <h1 class="mt-5">Comentários ({{ comments.length }})</h1>
                <hr>
                <div class="list_comments_scroll border-top border-bottom rounded" id="list_comments">
                    <div class="list-group">
                        <div class="list-group-item" v-for="(comment, index) in allComments">
                            <span class="comment__author"><strong class="text-dark">{{ comment.author }}</strong> <small class="text-muted">{{ comment.created_at }}</small></span>
                            <p class="font-italic text-secondary">{{ comment.message }}</p>
                            <div>
                                <a href="#" v-on:click.prevent="addLikedComment(index)"><i class="far fa-thumbs-up" v-bind:class="{ 'text-primary': comment.liked, 'text-secondary': !comment.liked }" title="Gostei"></i></a>&nbsp;<small class="text-muted">{{ comment.likes }}</small>&nbsp;&nbsp;
                                <a href="#" v-on:click.prevent="addDislikedComment(index)"><i class="far fa-thumbs-down" v-bind:class="{ 'text-danger': comment.disliked, 'text-secondary': !comment.disliked }" title="Não gostei"></i></a>&nbsp;<small class="text-muted">{{ comment.dislikes }}</small>&nbsp;&nbsp;
                                <a v-if="comment.author_id != author_id" href="#" v-on:click.prevent="replyComment(index)"><i class="fas fa-reply text-secondary" title="Responder"></i></a>
                                <a v-if="comment.author_id == author_id" href="#" v-on:click.prevent="removeComment(index)"><i class="far fa-trash-alt text-secondary" title="Excluir"></i></a>
                            </div>
                        </div>
                    </div>
                </div>
                <hr>
                <div class="form-todo form-group form_comment">
                    <p>
                        <input type="text" name="author" id="author" class="form-control" placeholder="Autor" aria-describedby="helpId" v-model="author">
                    </p>
                    <p>
                        <textarea name="message" id="message" class="form-control" placeholder="Escreva um comentário..." cols="30" rows="3" v-model="message" style="resize: none;"></textarea>
                    </p>
                    <button v-on:click="addComment" class="btn btn-success">Enviar</button>
                </div>
            </div>
        </div>
    `,
    data() {
        return {
            comments: [
                new Comment(999, 'Ana', 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.')
            ],
            author_id: 123,
            author: "Wellyson Vieira",
            message: "",
        }
    },
    methods: {
        addComment(){
            if(this.message.trim() === '') return;

            this.comments.push(new Comment(this.author_id, this.author, this.message));
            this.message = "";
        },

        removeComment(index){
            this.comments.splice(index, 1);
        },

        addLikedComment(index){
            this.comments[index].setLiked();
        },

        addDislikedComment(index){
            this.comments[index].setDisLiked();
        },

        getDateFormated(timestamp){
            const dia = ['Dom','Seg','Ter','Qua','Qui','Sex','Sáb']
            const mes = ['Jan','Fev','Mar','Abr','Mai','Jun','Jul','Ago','Set','Out','Nov','Dez']
            const date = new Date(timestamp);
            //return date.toString()
            return `${dia[date.getDay()]}, ${date.getDate()} de ${mes[date.getMonth()+1]} de ${date.getFullYear()} às ${date.getHours()}:${date.getMinutes()}`
        }
    },
    computed: {
        allComments(){
            return this.comments.map(comment => ({
                ...comment,
                created_at: this.getDateFormated(comment.created_at)
            }));
        }
    },
    watch: {
        comments(val){
            //console.log(val)
        }
    }
})