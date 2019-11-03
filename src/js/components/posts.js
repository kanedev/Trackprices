import React from 'react'
import {Link} from 'react-router-dom'

const posts = ({data,removeItemClick}) => {
    return (
		<div className="table-responsive">
		<table className="table" >
				<thead>
					<tr>
						<th scope="col">
							Number
						</th>
						<th scope="col">
							Date
						</th>
						<th scope="col">
							Product
						</th>
						<th scope="col">
							Price
						</th>
						<th scope="col">
							Manage
						</th>
					</tr>


				</thead>



				<tbody>
{data.map((item,i) => {
    
return (
    <tr id={item._id} key={i}>
    <th scope="row">
		{i+1}
		{/* {i+1} : {item._id} */}
    </th>
	<td>
    {item.publishDate}
    </td>

    <td>
	<a href={item.url}> {item.title} </a> 
    </td>

    <td>
	{item.price}
    </td>



    <td>
	<Link to={`/post/edit/${item._id}`} name="button_modification_name" id={`button_edit_id_${i}`} className="btn btn-warning" >+</Link> 
    
	<button name="button_suppression_name" id={`button_remove_id_${i}`} className="btn btn-danger"  onClick={() => {removeItemClick(item._id)}} >x</button> 


    </td>
</tr>
)

})

 }
</tbody>
			</table>
			</div>	
 
 

    )
}

export default posts
