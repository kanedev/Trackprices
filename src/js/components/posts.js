import React from 'react'
// import {Link} from 'react-router-dom'

const posts = ({data,removeItemClick}) => {
    return (
 
 
		<div class="table-responsive">
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
							Title
						</th>
						<th scope="col">
							Content
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
        {item.title}
    </td>
    <td>
    {item.content}
    </td>
    <td>
	<button name="button_modification_name" id={`button_edit_id_${item._id}`} className="btn btn-warning" >+</button> 
    
	<button name="button_suppression_name" id={`button_remove_id_${item._id}`} className="btn btn-danger"  onClick={() => {removeItemClick(i)}} >x</button> 


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
