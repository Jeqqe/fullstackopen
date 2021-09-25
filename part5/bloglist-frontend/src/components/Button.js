const LikeBtn = ({ blogService, blog, setBlogs, likeBtnTest }) => (
    <button
        onClick={async () => {
            await likeBtnTest()
            await blogService.addLike(blog)
            const blogs = await blogService.getAll()
            setBlogs(blogs)
        }}>
        like
    </button>
)
