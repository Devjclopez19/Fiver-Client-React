import React from "react";
import "./Message.scss";
import Layout from "../../components/Layout";
import { Link, useParams } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import newRequest from "../../utils/newRequest";

const Message = () => {
  const { id } = useParams();
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  const queryClient = useQueryClient();

  const { isLoading, error, data } = useQuery({
    queryKey: ["messages"],
    queryFn: () => {
      return newRequest.get(`/messages/${id}`);
    },
  });

  const mutation = useMutation({
    mutationFn: (message) => {
      return newRequest.post(`/messages`, message);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["messages"]);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault()
    mutation.mutate({
      conversationId: id,
      desc: e.target[0].value
    })
    e.target[0].value = ""
  };

  return (
    <Layout>
      <div className="message">
        <div className="container">
          <span className="breadcrumbs">
            <Link to="/messages">Messages</Link> {"> "}John Doe
          </span>
          {isLoading ? (
            "Loading"
          ) : error ? (
            "Something went wrong"
          ) : (
            <div className="messages">
              {data?.data.data.map(m => (
                <div className={m.userId === currentUser._id ? "item owner" : "item"} key={m._id}>
                  <img
                    src="https://images.pexels.com/photos/270408/pexels-photo-270408.jpeg?auto=compress&cs=tinysrgb&w=1600"
                    alt=""
                  />
                  <p>
                    {m.desc}
                  </p>
                </div>
              ))}
            </div>
          )}
         <hr />
        <form className="write" onSubmit={handleSubmit}>
          <textarea  placeholder="write a message" />
          <button type="submit">Send</button>
        </form>
        </div>
      </div>
    </Layout>
  );
};

export default Message;
