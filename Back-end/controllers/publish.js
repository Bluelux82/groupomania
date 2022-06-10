// Import 
const mysql = require('mysql');
const fs = require('fs');
const jwtId = require('../JWT/jwt');

// Connection to db
const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSSWORD,
    database: process.env.DATABASE
});

// CREATE new post 
exports.create = (req, res, next) => {
    let title = req.body.title; // get title from req.body
    let image = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`; // Get image from req.file
    let userId = jwtId.getId(req.headers.authorization); // get userId
    //
    db.query("SELECT firstName FROM users WHERE id = ?", id, (err, results) => {
        if (err) {
            console.log(err)
            // If title and image is empty
        } else {
            if (title == "null" || image == null) {
                res.status(400).json({ error: "L'un des champs est vides." })
                // If not empty
            } else {
                let userName = results[0].firstName;
                // Insert all information into new post in userspost
                db.query("INSERT INTO userspost (userName, title, image ,userId) VALUES (?, ?, ?, ?);",
                    [userName, title, image, userId],
                    (err, results) => {
                        if (err) { console.log(err) }
                        else { res.status(201).json({ results }) }
                    }
                )
            }
        }
    })
};

// Display all posts
exports.displayAll = (req, res, next) => {
    db.query("SELECT * FROM userspost ORDER BY date DESC", (err, results) => {
        if (err) {
            console.log(err)
        } else {
            res.status(200).json({ results })
            console.log(results)
        }
    })
};

// Delete post
exports.delete = (req, res, next) => {
    let postId = req.params.id
    let userId = jwtId.getId(req.headers.authorization);
    // If user isAdmin = true give him permission to delete
    db.query("SELECT isAdmin FROM users WHERE id = ?", userId, (err, results) => {
        if (err) {
            console.log(err)
        } else {
            db.query("SELECT image, userId FROM userspost WHERE id = ?", postId, (err, results2) => {
                if (err) {
                    console.log(err)
                } else if (results[0].isAdmin == true || results2[0].userId == userId) {
                    const filename = results2[0].image.split('/images/')[1];
                    fs.unlink(`images/${filename}`, () => { });
                    db.query("DELETE FROM userspost WHERE id = ?", postId, (err, results3) => {
                        if (err) {
                            console.log(err)
                        } else {
                            res.status(202).json({ results3 })
                        }
                    })
                } else {
                    res.status(401).json({ message: "Vous n'avez pas les droits requis pour cette action." })
                }
            })
        }
    })
};

// Display one post
exports.displayOne = (req, res, next) => {
    let id = req.params.id;
    let userId = jwtId.getId(req.headers.authorization);
    db.query("SELECT isAdmin FROM users WHERE id = ?", userId, (err, results) => {
        if (err) { console.log(err) }
        else {
            db.query("SELECT * FROM userspost WHERE id = ?", id, (err, results1) => {
                if (results[0].isAdmin == true || results1[0].userId == userId) {
                    res.status(200).json({ results1 })
                    console.log(results1)
                } else {
                    res.status(401).json({ message: "Vous n'avez pas les droits requis pour cette action." })
                }
            })
        }
    })
};

// Modify post
exports.modify = (req, res, next) => {
    let title = req.body.title;
    let id = req.body.postId
    let userId = jwtId.getId(req.headers.authorization)
    db.query("SELECT isAdmin FROM users WHERE id = ?", userId, (err, resultsAdmin) => {
        if (err) { console.log(err) }
        else {
            db.query("SELECT image, userId FROM userspost WHERE id = ?", id, (err, results) => {
                if (err) { console.log(err) }
                else if (resultsAdmin[0].isAdmin == true || results[0].userId == userId) {
                    // Update only title
                    if (!req.file) {
                        console.log("Aucune image dans la requête.")
                        db.query("UPDATE userspost SET title = ? WHERE id = ? ", [title, id], (err, results1) => {
                            if (err) {
                                console.log(err)
                            }
                            else {
                                console.log(results1)
                                res.status(201).json({ results: 'Post modifié avec succés !' })
                            }
                        })
                        // Update only image
                    } else if (req.body.title == "null") {
                        console.log("Aucun titre dans le requête.")
                        const filename = results[0].image.split('/images/')[1];
                        fs.unlink(`images/${filename}`, () => { });
                        let image = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`;
                        db.query("UPDATE userspost SET image = ? WHERE id = ?", [image, id], (err, results2) => {
                            if (err) {
                                console.log(err)
                            }
                            else {
                                console.log(results2)
                                res.status(201).json({ results: 'Post modifié avec succés !' })
                            }
                        })
                        // Update both
                    } else {
                        console.log("Titre et image dans la requête.")
                        const filename = results[0].image.split('/images/')[1];
                        fs.unlink(`images/${filename}`, () => { });
                        let image = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`;
                        db.query("UPDATE userspost SET title = ?, image = ? WHERE id = ?", [title, image, id], (err, results3) => {
                            if (err) {
                                console.log(err)
                            }
                            else {
                                console.log(results3)
                                res.status(201).json({ results: 'Post modifié avec succés !' })
                            }
                        })
                    }
                } else {
                    res.status(401).json({ message: "Vous n'avez pas les droits pour faire cela." })
                }
            })
        }
    })
}

// Like a post
exports.postLike = (req, res, next) => {
    let postId = req.params.id; // Get post Id from params
    let userId = jwtId.getId(req.headers.authorization) // get userId
    db.query('SELECT * FROM usersDisliked WHERE usersId = ? AND postId = ?', [userId, postId], (err, results1) => {
        if (err) {
            console.log(err)
            // If user already disliked the post
        } else {
            console.log(results1)
            if (results1.length > 0) {
                res.status(409).json({ message: 'Ce post est déjà disliké.' })
            }
            // If user didn't disliked the post
            if (results1.length < 1) {
                db.query('SELECT * FROM usersLiked WHERE usersId = ? AND postId = ?', [userId, postId], (err, results2) => {
                    if (err) {
                        console.log(err)
                    }
                    // if user alredy liked the post | delete the like from usersLiked
                    else if (results2.length > 0) {
                        db.query('DELETE FROM usersLiked WHERE postId = ? AND usersId = ?', [postId, userId], (err, results3) => {
                            if (err) {
                                console.log(err)
                                // And increment like by current like value -1
                            } else {
                                db.query('UPDATE userspost SET likes = likes - 1 WHERE id = ?', postId, (err, results4) => {
                                    if (err) {
                                        console.log(err)
                                    } else {
                                        console.log(results4)
                                        res.status(201).json({ message: 'like supprimé !' })
                                    }
                                })
                                console.log(results3)
                            }
                        })
                    }
                    // If user didn't liked the post | insert the like in usersLiked
                    else if (results2.length < 1) {
                        db.query('INSERT INTO usersLiked (postId,usersId) VALUES (?, ?)', [postId, userId], (err, results3) => {
                            if (err) {
                                console.log(err)
                                // And increment like by current like value + 1
                            } else {
                                console.log(results3)
                                db.query('UPDATE userspost SET likes = likes + 1 WHERE id = ?', postId, (err, results4) => {
                                    if (err) {
                                        console.log(err)
                                    } else {
                                        console.log(results4)
                                        res.status(201).json({ message: 'like ajouté !' })
                                    }
                                })
                            }
                        })
                    }
                }
                )
            }
        }
    })
}

// SAME AS LIKE BUT WHIT DISLIKE
// Dislike a post
exports.postDislike = (req, res, next) => {
    let postId = req.params.id;
    let userId = jwtId.getId(req.headers.authorization)
    db.query('SELECT * FROM usersLiked WHERE usersId = ? AND postId = ?', [userId, postId], (err, results1) => {
        if (err) {
            console.log(err)
        } else {
            console.log(results1)
            if (results1.length > 0) {
                res.status(409).json({ message: 'Ce post est déjà liké.' })
            }
            if (results1.length < 1) {
                db.query('SELECT * FROM usersDisliked WHERE usersId = ? AND postId = ?', [userId, postId], (err, results2) => {
                    if (err) {
                        console.log(err)
                    }
                    else if (results2.length > 0) {
                        db.query('DELETE FROM usersDisliked WHERE postId = ? AND usersId = ?', [postId, userId], (err, results3) => {
                            if (err) {
                                console.log(err)
                            } else {
                                db.query('UPDATE userspost SET dislikes = dislikes - 1 WHERE id = ?', postId, (err, results5) => {
                                    if (err) {
                                        console.log(err)
                                    } else {
                                        console.log(results5)
                                        res.status(201).json({ message: 'Dislike supprimé !' })
                                    }
                                })
                                console.log(results3)
                            }
                        })
                    }
                    else if (results2.length < 1) {
                        db.query('INSERT INTO usersDisliked (postId,usersId) VALUES (?, ?)', [postId, userId], (err, results3) => {
                            if (err) {
                                console.log(err)
                            } else {
                                console.log(results3)
                                db.query('UPDATE userspost SET dislikes = dislikes + 1 WHERE id = ?', postId, (err, results4) => {
                                    if (err) {
                                        console.log(err)
                                    } else {
                                        console.log(results4)
                                        res.status(201).json({ message: 'Dislike ajouté !' })
                                    }
                                })
                            }
                        })
                    }
                }
                )
            }
        }
    })
}