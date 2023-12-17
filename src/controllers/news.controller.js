import {
  createService,
  findAllService,
  countNews,
  topNewsService,
  findByIdService,
  searchByTitleService,
  byUserService,
  updateService,
  eraseService,
  likeNewsService,
  deleteLikeNewsService,
  addCommentService,
  deleteCommentService,
} from "../services/news.service.js";
import { ObjectId } from "mongoose";

export const create = async (req, res) => {
  try {
    const { title, text, banner } = req.body;

    if (!title || !text || !banner) {
      res.status(400).send({
        message: "Submit all fields for registration",
      });
    }

    await createService({
      title,
      text,
      banner,
      user: req.userId,
    });

    res.sendStatus(201);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};
export const findAll = async (req, res) => {
  try {
    let { limit, offset } = req.query;

    limit = Number(limit);
    offset = Number(offset);

    if (!limit) {
      limit = 5;
    }

    if (!offset) {
      offset = 0;
    }

    const news = await findAllService(offset, limit);
    const total = await countNews();
    const currentUrl = req.baseUrl;

    const next = offset + limit;
    const nextUrl =
      next < total ? `${currentUrl}?limit=${limit}&offset=${next}` : null;

    const previous = offset - limit < 0 ? null : offset - limit;
    const previousUrl =
      previous != null
        ? `${currentUrl}?limit=${limit}&offset=${previous}`
        : null;

    if (news.length === 0) {
      return res.status(400).send({
        message: "There are no registered news",
      });
    }
    res.send({
      nextUrl,
      previousUrl,
      limit,
      offset,
      total,
      results: news.map((item) => ({
        id: item._id,
        title: item.title,
        text: item.text,
        banner: item.banner,
        likes: item.likes,
        comments: item.comments,
        name: item.user.name,
        userName: item.user.username,
        userAvatar: item.user.avatar,
      })),
    });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};
export const topNews = async (req, res) => {
  try {
    const news = await topNewsService();

    if (!news) {
      return res
        .sendStatus(400)
        .send({ message: "There is no registered post" });
    }

    res.send({
      news: {
        id: news._id,
        title: news.title,
        text: news.text,
        banner: news.banner,
        likes: news.likes,
        comments: news.comments,
        name: news.user.name,
        userName: news.user.username,
        userAvatar: news.user.avatar,
      },
    });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};
export const findById = async (req, res) => {
  try {
    const { id } = req.params;
    const news = await findByIdService(id);

    return res.send({
      news: {
        id: news._id,
        title: news.title,
        text: news.text,
        banner: news.banner,
        likes: news.likes,
        comments: news.comments,
        name: news.user.username,
        userAvatar: news.user.avatar,
      },
    });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};
export const searchByTitle = async (req, res) => {
  try {
    const { title } = req.query;

    const news = await searchByTitleService(title);

    if (news.length === 0) {
      return res
        .status(400)
        .send({ message: "There are no news with this title" });
    }

    return res.send({
      results: news.map((item) => ({
        id: item._id,
        title: item.title,
        text: item.text,
        banner: item.banner,
        likes: item.likes,
        comments: item.comments,
        name: item.user.username,
        userAvatar: item.user.avatar,
      })),
    });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};
export const byUser = async (req, res) => {
  try {
    const id = req.userId;
    const news = await byUserService(id);

    return res.send({
      results: news.map((item) => ({
        id: item._id,
        title: item.title,
        text: item.text,
        banner: item.banner,
        likes: item.likes,
        comments: item.comments,
        name: item.user.username,
        userAvatar: item.user.avatar,
      })),
    });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};
export const update = async (req, res) => {
  try {
    const { title, text, banner } = req.body;
    const { id } = req.params;

    if (!title && !text) {
      res.status(400).send({
        message: "Submit at least one filed to update the post",
      });
    }

    const news = await findByIdService(id);

    if (news.user.id != req.userId) {
      return res.status(400).send({
        message: "You didn't update this post",
      });
    }

    await updateService(id, title, text, banner);

    return res.send({ message: "Post successfully updated!" });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};
export const erase = async (req, res) => {
  try {
    const { id } = req.params;

    const news = await findByIdService(id);

    if (String(news.user._id) !== String(req.userId)) {
      return res.status(400).send({
        message: "You didn't delet this post!",
      });
    }

    await eraseService(id);

    return res.send({ message: "News deleted seuccessfully!" });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};
export const likeNews = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.userId;

    const newsLiked = await likeNewsService(id, userId);

    if (!newsLiked) {
      await deleteLikeNewsService(id, userId);
      return res.status(200).send({ message: "Liked successfully removed" });
    }

    res.send({ message: "Like done successfully" });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};
export const addComment = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.userId;
    const { comment } = req.body;

    if (!comment) {
      return res.status(400).send({ message: "Write a message to comment" });
    }

    await addCommentService(id, comment, userId);

    res.send({
      message: "Comment successfully completed!",
    });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};
export const deleteComment = async (req, res) => {
  s;
  try {
    const { idNews, idComment } = req.params;
    const userId = req.userId;

    const commentDeleted = await deleteCommentService(
      idNews,
      userId,
      idComment
    );

    const commentFinder = commentDeleted.comments.find(
      (comment) => comment.idComment === idComment
    );

    if (!commentFinder) {
      return res.status(400).send({ message: "Comment doen't exists" });
    }

    if (commentFinder.userId !== userId) {
      console.log(commentFinder.userId + " + " + userId);
      return res
        .status(400)
        .send({ message: "You can't delete this comment!" });
    }

    res.send({
      message: "Comment successfully removed!",
    });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

// export { create, findAll, topNews, findById };
