import React from "react";
import "./MyGigs.scss";
import Layout from "../../components/Layout";
import { Link } from "react-router-dom";
import getCurrentUser from "../../utils/getCurrentUser";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import newRequest from "../../utils/newRequest";

const MyGigs = () => {
  
  const queryClient = useQueryClient()
  const currentUser = getCurrentUser()

  const { isLoading, error, data, refetch } = useQuery({
    queryKey: ["myGigs"],
    queryFn: () => {
      return newRequest.get(`/gigs?userId=${currentUser._id}`);
    },
  });

  const mutation = useMutation({
    mutationFn: (id) => {
      return newRequest.delete(`/gigs/${id}`)
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["myGigs"])
    }
  })

  const handleDelete = (id) => {
    mutation.mutate(id)
  }

  return (
    <Layout>
      <div className="myGigs">
        <div className="container">
          <div className="title">
            <h1>Gigs</h1>
            {currentUser.isSeller && (
              <Link to="/add">
                <button>Add New Gig</button>
              </Link>
            )}
          </div>
          <table>
            <thead>
              <tr>
                <th>Image</th>
                <th>Title</th>
                <th>Price</th>
                <th>Sales</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {data?.data.data.map(gig => (
                <tr key={gig._id}>
                <td>
                  <img
                    className="image"
                    src={gig.cover}
                    alt=""
                  />
                </td>
                <td>{gig.title}</td>
                <td>
                  {gig.price}
                </td>
                <td>{gig.sales}</td>
                <td>
                  <img className="delete" src="./img/delete.png" alt="" onClick={() => handleDelete(gig._id)}/>
                </td>
              </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
};

export default MyGigs;
