const PostModel = require('../models/post.model');


module.exports.getPosts = async (req, res) => {
    try {
        const posts = await PostModel.find();

        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la récupération des posts." });
    }
};

module.exports.setPosts = async (req, res) => {
    // Vérification de la présence du champ "message"
    if (!req.body.message) {
        return res.status(400).json({ message: "Merci d'ajouter un message !" });
    }

    try {
        // Création du nouveau poste
        const post = await PostModel.create({
            message: req.body.message,
            autor: req.body.autor
        });

        // Envoi de la réponse de réussite
        res.status(200).json(post);
    } catch (error) {
        // Gestion des erreurs lors de la création du poste
        res.status(500).json({ message: "Erreur lors de la création du poste." });
    }
};

module.exports.editPost = async (req, res) => {
    try {
        const post = await PostModel.findById(req.params.id);
        console.log(post);
        
        if (!post) {
            return res.status(400).json({ message: "Ce post n'existe pas" });
        }

        // Autres traitements pour la modification du post

        // Exemple : Mise à jour du message du post
        const updatePost = await PostModel.findByIdAndUpdate(post, req.body, {
            new: true,
        });

        // Envoi de la réponse de succès
        return res.status(200).json(updatePost);

    } catch (error) {
        // Gestion des erreurs lors de la recherche ou de la modification du post
        console.log(error);
        return res.status(500).json({ message: "Erreur lors de la modification du post. l'ID n'est pas valide" });
    }
};

module.exports.deletePost = async (req, res) => {
    try {
        const post = await PostModel.findById(req.params.id);
        if (!post) {
            return res.status(400).json({ message: "Ce post n'existe pas" });
        }
        await PostModel.deleteOne({ _id: post._id });
        return res.status(200).json({ message: "Post supprimé", postId: req.params.id });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Erreur lors de la suppression du post." });
    }
};

module.exports.likePost = async (req, res) => {
    try {
        const postId = req.params.id;
        const userId = req.body.userId;

        const updatedPost = await PostModel.findByIdAndUpdate(
            postId,
            { $addToSet: { likers: userId } },
            { new: true }
        );

        if (!updatedPost) {
            return res.status(404).json({ message: "Ce post n'existe pas" });
        }

        return res.status(200).json(updatedPost);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Erreur lors de la mise à jour du post." });
    }
};


module.exports.dislikePost = async (req, res) => {
    try {
        const postId = req.params.id;
        const userId = req.body.userId;

        const updatedPost = await PostModel.findByIdAndUpdate(
            postId,
            { $pull: { likers: userId } },
            { new: true }
        );

        if (!updatedPost) {
            return res.status(404).json({ message: "Ce post n'existe pas" });
        }

        return res.status(200).json(updatedPost);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Erreur lors de la mise à jour du post." });
    }
};



