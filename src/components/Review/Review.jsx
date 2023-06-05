import React from "react";
import { Rating } from "@mui/material";
import logoUser from "../../assets/user-regular-24.png";
import "../Review/Review.css";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";

export const Review = ({ id }) => {
  const darkModes = useSelector((state) => state.darkModes);
  const [data, setData] = useState();

  useEffect(() => {
    const axiosData = async () => {
      try {
        const response = await axios.get(
          `https://tuki-server.onrender.com/product/review/${id}`
        );
        setData(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    axiosData();
  }, []);

  return (
    <div className={darkModes ? "reviews-container-dark" : "reviews-container"}>
      {data &&
        data?.map((review) => (
          <div className="all-review">
            <img src={logoUser} alt="" />
            <Rating
              name="half-rating-read"
              value={review?.punctuationproduct}
              precision={0.1}
              readOnly
              size="large"
            />
            <h4>{review?.user}</h4>
            <h6 className={darkModes ? "review-h6-dark" : "review-h6"}>
              {review?.coment}
            </h6>
          </div>
        ))}
      {(!data || data.length === 0) && <h2>Sin comentarios</h2>}
    </div>
  );
};
