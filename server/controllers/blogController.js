const { slugify } = require("../helpers/slugify");
const Blog = require("../models/blogModel");
const Category = require("../models/categoryModel");

// Create a new blog post
const createBlog = async (req, res) => {
  try {
    const {
      title,
      thumbnail,
      content,
      categoryId,
      excerpt,
      metaDescription,
      keywords,
    } = req.body;

    // Generate slug from title
    let slug = slugify(title);

    // Check if the slug already exists
    let existingBlog = await Blog.findOne({ slug });
    let count = 1;
    while (existingBlog) {
      slug = `${slugify(title)}-${count}`;
      existingBlog = await Blog.findOne({ slug });
      count += 1;
    }

    // Check if the category exists
    const category = await Category.findById(categoryId);
    if (!category) {
      return res.status(404).json({ error: "Category not found" });
    }

    const newBlog = new Blog({
      title,
      slug,
      thumbnail,
      content,
      category: categoryId,
      excerpt,
      metaDescription,
      keywords,
    });

    await newBlog.save();
    res.status(201).json(newBlog);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// // Get all blog posts
// const getAllBlogs = async (req, res) => {
//   try {
//     const blogs = await Blog.find().populate("category").exec();
//     res.status(200).json(blogs);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// Get all blog posts with optional pagination
const getAllBlogs = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 10; // Default limit is 10
    const page = parseInt(req.query.page) || 1; // Default page is 1

    const blogs = await Blog.find()
      .populate("category")
      .limit(limit) // Limit the number of blog posts returned
      .skip((page - 1) * limit) // Skip posts to simulate pagination
      .exec();

    // Optionally, you might want to get the total count of blogs for pagination info
    const totalBlogs = await Blog.countDocuments();

    res.status(200).json({
      success: true,
      data: blogs,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(totalBlogs / limit),
        totalBlogs,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get a single blog post by slug
const getBlogBySlug = async (req, res) => {
  try {
    const { slug } = req.params;
    const blog = await Blog.findOne({ slug }).populate("category").exec();
    if (!blog) {
      return res.status(404).json({ error: "Blog post not found" });
    }
    res.status(200).json(blog);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
// Get a single blog post by slug
const getBlogById = async (req, res) => {
  try {
    const { id } = req.params;
    const blog = await Blog.findOne({ _id: id }).populate("category").exec();
    if (!blog) {
      return res.status(404).json({ error: "Blog post not found" });
    }
    res.status(200).json(blog);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a blog post by ID
const updateBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      title,
      thumbnail,
      content,
      categoryId,
      excerpt,
      metaDescription,
      keywords,
    } = req.body;

    // Generate slug from title
    const slug = slugify(title);

    // Check if the category exists
    const category = await Category.findById(categoryId);
    if (!category) {
      return res.status(404).json({ error: "Category not found" });
    }

    const updatedBlog = await Blog.findByIdAndUpdate(
      id,
      {
        title,
        slug,
        thumbnail,
        content,
        category: categoryId,
        excerpt,
        metaDescription,
        keywords,
      },
      { new: true }
    );

    if (!updatedBlog) {
      return res.status(404).json({ error: "Blog post not found" });
    }

    res.status(200).json(updatedBlog);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a blog post by ID
const deleteBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedBlog = await Blog.findByIdAndDelete(id);

    if (!deletedBlog) {
      return res.status(404).json({ error: "Blog post not found" });
    }

    res.status(200).json({ message: "Blog post deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all blog posts by category ID
const getBlogsByCategory = async (req, res) => {
  try {
    const { categoryId } = req.params;
    const blogs = await Blog.find({ category: categoryId })
      .populate("category")
      .exec();

    if (blogs.length === 0) {
      return res
        .status(404)
        .json({ message: "No blogs found for this category" });
    }

    res.status(200).json(blogs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createBlog,
  getAllBlogs,
  getBlogBySlug,
  updateBlog,
  deleteBlog,
  getBlogsByCategory,
  getBlogById,
};
