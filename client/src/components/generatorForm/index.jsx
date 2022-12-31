import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { generateImage } from "../../services/generatorService";
import ImageGallery from "../imageGallery";
import Spinner from "../spinner";
import "./style.scss";
export default function GeneratorForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [loading, setLoading] = useState(false);
  const [imgData, setImgData] = useState(null);

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      setImgData(null);
      const reqData = {
        prompt: data.description,
        n: Number(data.count),
        size: `${data.size}x${data.size}`,
      };
      const res = await generateImage(reqData);
      setImgData(res.data);
      setLoading(false);
    } catch (error) {
      toast.error(error.message, {
        autoClose: 2000,
        theme: "colored",
      });
      setLoading(false)
    }
  };
  return (
    <>
      <ToastContainer />
      {loading && <Spinner/>}
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={`form-group ${errors.count && "error"}`}>
          <label>Description</label>
          <input
            type="text"
            placeholder="Type image description..."
            {...register("description", {
              required: "Description is required",
            })}
          />
          {errors.description && (
            <span className="form-error-message">
              {errors.description.message}
            </span>
          )}
        </div>
        <div className={`form-group ${errors.count && "error"}`}>
          <label>Count</label>
          <input
            type="number"
            defaultValue={1}
            placeholder="Enter the count..."
            {...register("count", {
              required: "Count is required",
              max: { value: 10, message: "Count should not be more than 10" },
            })}
          />
          {errors.count && (
            <span className="form-error-message">{errors.count.message}</span>
          )}
        </div>
        <div className="form-group">
          <label>Size</label>
          <select {...register("size", { required: true })}>
            <option value="256">Small</option>
            <option value="512">Medium</option>
            <option value="1024">Large</option>
          </select>
          {errors.size && (
            <span className="form-error-message">This field is required</span>
          )}
        </div>
        <button type="submit" disabled={loading}>
          {loading ? "Loading..." : "Generate"}
        </button>
      </form>
      <ImageGallery imgData={imgData}/>
    </>
  );
}
