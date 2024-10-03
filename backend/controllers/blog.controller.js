import { Blog } from "../models/Blog.model.js";  
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";  

const createBlog = asyncHandler(async (req, res) => {
    const { title, content, tags } = req.body;
    const authorId = req.user._id;  
    let blogImage = null;

    if (!title || !content) {
        return res.status(400).json(new ApiError(400, null, "Title and content are required"));
    }

    if (req.file) {
        blogImage = await uploadOnCloudinary(req.file.path);
        if (!blogImage) {
            return res.status(500).json(new ApiError(500, null, "Image upload failed"));
        }
    }

    const newBlog = new Blog({
        title,
        content,
        tags,
        author: authorId,
        image: blogImage ? blogImage.secure_url : null
    });

    await newBlog.save();

    return res.status(201).json(new ApiResponse(201, newBlog, "Blog post created successfully"));
});

const getAllBlogs = asyncHandler(async (req, res) => {
    const page = parseInt(req.query.page) || 1;  
    const limit = parseInt(req.query.limit) || 10;  
    const skip = (page - 1) * limit;

    const blogs = await Blog.find({})
        .skip(skip)
        .limit(limit)
        .populate('author', 'name email')  
        .sort({ createdAt: -1 });  

    const totalBlogs = await Blog.countDocuments();

    return res.status(200).json(new ApiResponse(200, { blogs, totalPages: Math.ceil(totalBlogs / limit) }, "Blogs fetched successfully"));
});

const getBlogById = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const blog = await Blog.findById(id).populate('author', 'name email');

    if (!blog) {
        return res.status(404).json(new ApiError(404, null, "Blog post not found"));
    }

    return res.status(200).json(new ApiResponse(200, blog, "Blog post fetched successfully"));
});

const updateBlog = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { title, content, tags } = req.body;
    let blogImage = null;

    let blog = await Blog.findById(id);

    if (!blog) {
        return res.status(404).json(new ApiError(404, null, "Blog post not found"));
    }

    if (blog.author.toString() !== req.user._id.toString()) {
        return res.status(403).json(new ApiError(403, null, "Unauthorized to update this blog post"));
    }

    if (req.file) {
        blogImage = await uploadOnCloudinary(req.file.path);
        if (!blogImage) {
            return res.status(500).json(new ApiError(500, null, "Image upload failed"));
        }
    }

    if (title) blog.title = title;
    if (content) blog.content = content;
    if (tags) blog.tags = tags;
    if (blogImage) blog.image = blogImage.secure_url;

    await blog.save();

    return res.status(200).json(new ApiResponse(200, blog, "Blog post updated successfully"));
});

const deleteBlog = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const blog = await Blog.findById(id);

    if (!blog) {
        return res.status(404).json(new ApiError(404, null, "Blog post not found"));
    }

    if (blog.author.toString() !== req.user._id.toString()) {
        return res.status(403).json(new ApiError(403, null, "Unauthorized to delete this blog post"));
    }

    await blog.remove();

    return res.status(200).json(new ApiResponse(200, null, "Blog post deleted successfully"));
});

export { createBlog, getAllBlogs, getBlogById, updateBlog, deleteBlog };
