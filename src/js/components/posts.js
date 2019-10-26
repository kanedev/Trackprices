import React from 'react'
// import {Link} from 'react-router-dom'

const posts = ({data}) => {
    return (
<div className="container-fluid">
	<div className="row">
		<div className="col-md-12">
			<table className="table table-hover">
				<thead>
					<tr>
						<th>
							#
						</th>
						<th>
							Title
						</th>
						<th>
							Content
						</th>
						<th>
							Manage
						</th>
					</tr>


				</thead>
				<tbody>


{

data.map((item,i) => {
    
return (
    <tr key={i}>
    <td>
        {i+1}
    </td>
    <td>
        {item.title}
    </td>
    <td>
    {item.content}
    </td>
    <td>
    {/* <Link to={`/${item.id}`}> <button name="button_modification_name" id="button_modification_id" className="btn btn-warning">+</button> </Link>
    <Link to={`/${item.id}`}>  <button name="button_modification_name" id="button_modification_id" className="btn btn-danger" >x</button> </Link> */}

    </td>
</tr>
)

})

 }








	
				</tbody>
			</table>
		</div>
	</div>
</div>
    )
}

export default posts