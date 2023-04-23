import PropTypes from 'prop-types'

const AddBlog = ({ onAdd , createdBlog, setCreatedBlog }) => {

  return (
    <form onSubmit={onAdd}>
      <div>
        <label htmlFor="title">title: </label>
        <input type="text" name="title" id="title" required value={createdBlog.title} onChange={({ target }) => { setCreatedBlog({ ...createdBlog, title: target.value })}}/>
      </div>
      <div>
        <label htmlFor="author">author: </label>
        <input type="text" name="author" id="author" required value={createdBlog.author} onChange={({ target }) => { setCreatedBlog({ ...createdBlog, author: target.value })}}/>
      </div>
      <div>
        <label htmlFor="url">url: </label>
        <input type="text" name="url" id="url" required value={createdBlog.url} onChange={({ target }) => { setCreatedBlog({ ...createdBlog, url: target.value })}}/>
      </div>
      <button type="submit">create</button>
    </form>
  )
}

AddBlog.propTypes = {
  onAdd: PropTypes.func.isRequired,
  createdBlog: PropTypes.object.isRequired,
  setCreatedBlog: PropTypes.func.isRequired
}

export default AddBlog