import React from 'react'
import {Link} from 'react-router-dom'
// import 'dayjs/locale/fr'

//dayjs.locale('fr') // use French locale globally

const dayjs = require('dayjs');

// let now = dayjs();

// console.log(now.format());

//console.log(dayjs().format("YYYY-MM-DD"));
//console.log(dayjs().format("HH:mm:ss"));

const posts = ({data,removeItemClick}) => {
    return (
		<div className="table-responsive">
		<table className="table" >
				<thead>
					<tr>
						<th scope="col">
				# 
						</th>
						<th scope="col">
				Date
						</th>
						<th scope="col">
							Site
						</th>

						<th scope="col">
							Product
						</th>
						<th scope="col">
							Price
						</th>
						<th scope="col">
							Shipping
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
	{/* { dayjs(item.publishDate).format("YYYY-MM-DD")   } */}
	{dayjs().diff(dayjs(item.publishDate).format("YYYY-MM-DD") , 'days')+`Day`  }
	
    </td>
    <td>
	 {item.site}  
    </td>

    <td>
	<a href={item.url}><img src={item.urlImage} alt="image of the product" className="card-img"  /></a> 
 
	<a href={item.url}> {item.title} </a> 
    </td>

    <td>
	{/* {item.price} */}

	<ul className="list-group">
	{item.prices.map((item,i) => {
	return(<li id={item._id} key={i} className="list-group-item d-flex justify-content-between align-items-center ">
		{item.price}
		<span className="badge badge-secondary badge-pill">{ dayjs(item.date).format("YYYY-MM-DD HH:mm")}</span>
	</li> ) 
	}
	)
	}
	</ul>
    </td>
    <td>
	 {item.shipping}  
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
