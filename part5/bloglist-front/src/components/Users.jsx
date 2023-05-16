import { Link } from 'react-router-dom'

const Users = ({ users }) => {
  return (
    <div>
      <h2>Users</h2>
      <br />
      <table>
        <thead>
          <tr>
            <th></th>
            <th style={{ paddingLeft: '15px' }}>blogs created</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>
                <Link to={`/users/${user.id}`}>{user.username}</Link>
              </td>
              <td style={{ textAlign: 'start', paddingLeft: '15px' }}>
                {user.blogs.length}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Users
