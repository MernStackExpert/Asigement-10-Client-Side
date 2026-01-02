import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import {
  FaGoogle, FaUser, FaEnvelope, FaLock, FaImage, FaEye, FaEyeSlash,
  FaCloudUploadAlt, FaCheckCircle
} from "react-icons/fa";
import { useAuthContext } from "../../Context/useAuthContext";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { motion } from "framer-motion";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [activeTab, setActiveTab] = useState("upload");
  const [isUploading, setIsUploading] = useState(false);
  const [preview, setPreview] = useState(null);
  
  const { googleLogin, createUser, updateUser, setLoading } = useAuthContext();
  const navigate = useNavigate();

  const image_hosting_key = import.meta.env.VITE_IMGBB_API_KEY;
  const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleUrlChange = (e) => {
    setPreview(e.target.value);
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value;
    let photoURL = "";

    // Validation
    if (password.length < 6) {
      return toast.error("Password must be at least 6 characters");
    }
    if (!/(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])/.test(password)) {
      return toast.error("Password must include uppercase, lowercase, and a number");
    }

    setIsUploading(true);

    try {
      if (activeTab === "upload") {
        const imageFile = form.imageFile.files[0];
        if (!imageFile) {
          setIsUploading(false);
          return toast.error("Please select an image file");
        }
        const formData = new FormData();
        formData.append("image", imageFile);

        const res = await fetch(image_hosting_api, { method: "POST", body: formData });
        const data = await res.json();
        if (data.success) {
          photoURL = data.data.display_url;
        } else {
          throw new Error("Image upload failed");
        }
      } else {
        photoURL = form.photoURL.value;
        if (!photoURL) {
          setIsUploading(false);
          return toast.error("Please provide an image URL");
        }
      }

      // Create User
      const result = await createUser(email, password);
      
      // Update Profile
      await updateUser({ displayName: name, photoURL });
      
      Swal.fire({
        icon: "success",
        title: "Registration Successful",
        showConfirmButton: false,
        timer: 1500,
      });
      navigate("/");

    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsUploading(false);
      setLoading(false); 
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await googleLogin();
      Swal.fire({
        icon: "success",
        title: "Logged in with Google",
        showConfirmButton: false,
        timer: 1500,
      });
      navigate("/");
    } catch (error) {
      toast.error(error.message);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-base-200 py-12 flex items-center justify-center px-4">
      <title>FinEase | Register</title>
      
      <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
        
        {/* Illustration Section */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          className="hidden lg:block space-y-6"
        >
          <h1 className="text-6xl font-black uppercase tracking-tighter leading-none text-base-content">
            Start Your <br /> <span className="text-primary">Journey</span>
          </h1>
          <p className="text-xl opacity-60 font-medium max-w-md">
            Join thousands of users managing their finances smarter with FinEase.
          </p>
          <div className="rounded-[3rem] overflow-hidden shadow-2xl border-8 border-base-100 max-w-sm">
            <img 
              src="https://img.freepik.com/free-vector/modern-personal-finance-management-composition-with-flat-design_23-2147915354.jpg" 
              alt="Register Illustration" 
              className="w-full"
            />
          </div>
        </motion.div>

        {/* Form Card */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="card w-full max-w-md mx-auto shadow-2xl bg-base-100 rounded-[2.5rem] border border-base-300"
        >
          <form onSubmit={handleRegister} className="card-body p-8 space-y-4">
            <div className="text-center mb-4">
               <h2 className="text-3xl font-black uppercase">Register</h2>
               <p className="text-xs font-bold opacity-40 uppercase tracking-widest mt-1">Create your secure account</p>
            </div>

            <div className="space-y-4">
              <label className="input input-bordered flex items-center gap-3 bg-base-200 border-none rounded-2xl h-14 w-full">
                <FaUser className="opacity-40" />
                <input type="text" name="name" placeholder="Full Name" className="grow font-bold w-full" required />
              </label>

              <label className="input input-bordered flex items-center gap-3 bg-base-200 border-none rounded-2xl h-14 w-full">
                <FaEnvelope className="opacity-40" />
                <input type="email" name="email" placeholder="Email Address" className="grow font-bold w-full" required />
              </label>
            </div>

            <div className="form-control">
              <div className="tabs tabs-boxed bg-base-200 rounded-2xl p-1 mb-4">
                <button type="button" className={`tab flex-1 rounded-xl font-bold transition-all ${activeTab === "upload" ? "bg-primary text-white" : ""}`} onClick={() => setActiveTab("upload")}>Upload File</button>
                <button type="button" className={`tab flex-1 rounded-xl font-bold transition-all ${activeTab === "url" ? "bg-primary text-white" : ""}`} onClick={() => setActiveTab("url")}>Image URL</button>
              </div>

              <div className="flex items-center gap-4">
                <div className="avatar">
                  <div className="w-16 h-16 rounded-2xl ring-2 ring-primary ring-offset-2 bg-base-200 flex items-center justify-center overflow-hidden">
                    {preview ? <img src={preview} alt="Preview" className="object-cover w-full h-full" /> : <FaImage className="text-2xl opacity-20" />}
                  </div>
                </div>

                <div className="flex-1">
                  {activeTab === "upload" ? (
                    <label className="flex items-center justify-center w-full h-14 border-2 border-dashed border-base-300 rounded-2xl cursor-pointer bg-base-200 hover:bg-base-300 transition-all">
                      <FaCloudUploadAlt className="text-xl mr-2 text-primary" />
                      <span className="text-[10px] font-black uppercase opacity-60">Choose Avatar</span>
                      <input type="file" name="imageFile" className="hidden" accept="image/*" onChange={handleImageChange} />
                    </label>
                  ) : (
                    <input type="url" name="photoURL" placeholder="https://..." className="input input-bordered w-full bg-base-200 border-none rounded-2xl h-14 font-bold text-sm" onChange={handleUrlChange} />
                  )}
                </div>
              </div>
            </div>

            <label className="input input-bordered flex items-center gap-3 bg-base-200 border-none rounded-2xl h-14 w-full">
              <FaLock className="opacity-40" />
              <input type={showPassword ? "text" : "password"} name="password" placeholder="Password" className="grow font-bold w-full" required />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="opacity-50">{showPassword ? <FaEyeSlash /> : <FaEye />}</button>
            </label>

            <button type="submit" disabled={isUploading} className="btn btn-primary w-full rounded-2xl h-14 shadow-xl text-white font-black uppercase tracking-widest mt-4">
              {isUploading ? <span className="loading loading-spinner"></span> : "Join FinEase"}
            </button>

            <div className="divider font-black opacity-10 text-[10px] uppercase">Social Register</div>

            <button onClick={handleGoogleLogin} type="button" className="btn btn-outline w-full rounded-2xl h-14 border-base-300 hover:bg-base-200 font-bold gap-3">
              <FaGoogle className="text-error" /> Sign up with Google
            </button>

            <p className="text-center mt-4 text-sm font-medium">
              Already a member? <Link to="/auth/login" className="text-primary font-black hover:underline underline-offset-4">Login here</Link>
            </p>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default Register;