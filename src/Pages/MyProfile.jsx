import React, { useState } from 'react';
import { FaUser, FaLink, FaSave, FaImage, FaEnvelope, FaCloudUploadAlt, FaCheckCircle } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';
import { useAuthContext } from '../Context/useAuthContext';

const MyProfile = () => {
  const { user, updateUser, setUser } = useAuthContext();
  
  const [displayName, setDisplayName] = useState(user?.displayName || '');
  const [photoURL, setPhotoURL] = useState(user?.photoURL || '');
  const [activeTab, setActiveTab] = useState("upload"); 
  const [isUploading, setIsUploading] = useState(false);
  const [preview, setPreview] = useState(null);
  const [uploadSuccess, setUploadSuccess] = useState(false);

  const image_hosting_key = import.meta.env.VITE_IMGBB_API_KEY;
  const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
      setUploadSuccess(false);
    }
  };

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    const form = e.target;
    let finalPhotoURL = photoURL;

    if (!displayName) {
      toast.error("Name cannot be empty.");
      return;
    }

    if (activeTab === "upload") {
      const imageFile = form.imageFile?.files[0];
      if (imageFile) {
        setIsUploading(true);
        const formData = new FormData();
        formData.append("image", imageFile);

        try {
          const res = await fetch(image_hosting_api, {
            method: "POST",
            body: formData,
          });
          const data = await res.json();
          if (data.success) {
            finalPhotoURL = data.data.display_url;
            setPhotoURL(finalPhotoURL);
            setUploadSuccess(true);
          }
        } catch (err) {
          toast.error("Image upload failed!");
          setIsUploading(false);
          return;
        }
      }
    }

    try {
      await updateUser({ displayName, photoURL: finalPhotoURL }); 
      setUser((prev) => ({ ...prev, displayName, photoURL: finalPhotoURL }));
      toast.success('Profile updated successfully!');
      setUploadSuccess(false);
      setPreview(null);
    } catch (error) {
      toast.error(error.message || 'Failed to update profile.');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-base-200 py-20 px-4">
      <title>FinEase | My Profile</title>
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-5xl mx-auto"
      >
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          <div className="lg:col-span-1">
            <div className="bg-base-100 rounded-[2.5rem] p-8 shadow-xl border border-base-300 text-center relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-r from-primary to-secondary opacity-20"></div>
              
              <div className="relative mt-4">
                <div className="avatar">
                  <div className="w-32 h-32 rounded-full ring-4 ring-primary ring-offset-base-100 ring-offset-4 shadow-2xl overflow-hidden bg-base-300">
                    <img src={preview || user?.photoURL || 'https://i.ibb.co/V3Tj6Vf/user.png'} alt="User" className="object-cover w-full h-full" />
                  </div>
                </div>
                {uploadSuccess && (
                  <div className="absolute bottom-0 right-1/2 translate-x-12 bg-success text-white p-2 rounded-full shadow-lg border-2 border-white">
                    <FaCheckCircle size={18} />
                  </div>
                )}
              </div>

              <h2 className="text-2xl font-black mt-6 text-base-content uppercase tracking-tight">
                {user?.displayName || 'FinEase User'}
              </h2>
              <p className="text-sm opacity-60 font-medium flex items-center justify-center gap-2 mt-1">
                <FaEnvelope className="text-primary" /> {user?.email}
              </p>
              
              <div className="divider opacity-50 my-6"></div>
              
              <div className="flex justify-around text-center">
                <div>
                  <p className="text-[10px] uppercase font-black opacity-30 tracking-widest leading-none mb-1">Status</p>
                  <p className="text-sm font-bold text-success uppercase">Verified</p>
                </div>
                <div>
                  <p className="text-[10px] uppercase font-black opacity-30 tracking-widest leading-none mb-1">Role</p>
                  <p className="text-sm font-bold uppercase">Member</p>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-2">
            <div className="bg-base-100 rounded-[2.5rem] p-8 md:p-12 shadow-xl border border-base-300">
              <h3 className="text-3xl font-black mb-2 uppercase tracking-tight">Account <span className="text-primary">Settings</span></h3>
              <p className="text-base-content/60 mb-10">Update your personal information and profile avatar.</p>

              <form onSubmit={handleProfileUpdate} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="form-control">
                    <label className="label font-bold text-xs uppercase opacity-60">Display Name</label>
                    <div className="relative">
                      <FaUser className="absolute left-4 top-4 text-primary opacity-50" />
                      <input
                        type="text"
                        className="input input-bordered w-full pl-12 bg-base-200 focus:input-primary rounded-2xl border-none font-bold h-14"
                        value={displayName}
                        onChange={(e) => setDisplayName(e.target.value)}
                        placeholder="John Doe"
                        required
                      />
                    </div>
                  </div>

                  <div className="form-control">
                    <label className="label font-bold text-xs uppercase opacity-60">Email Address (Fixed)</label>
                    <div className="relative">
                      <FaEnvelope className="absolute left-4 top-4 text-primary opacity-50" />
                      <input
                        type="email"
                        className="input input-bordered w-full pl-12 bg-base-200 cursor-not-allowed rounded-2xl border-none opacity-40 font-bold h-14"
                        value={user?.email}
                        disabled
                      />
                    </div>
                  </div>
                </div>

                <div className="form-control">
                  <label className="label font-bold text-xs uppercase opacity-60">Profile Image</label>
                  <div className="tabs tabs-boxed bg-base-200 rounded-2xl p-1 mb-4">
                    <button 
                      type="button" 
                      className={`tab flex-1 rounded-xl font-bold transition-all ${activeTab === "upload" ? "bg-primary text-white" : ""}`}
                      onClick={() => setActiveTab("upload")}
                    >
                      <FaCloudUploadAlt className="mr-2" /> File Upload
                    </button>
                    <button 
                      type="button" 
                      className={`tab flex-1 rounded-xl font-bold transition-all ${activeTab === "url" ? "bg-primary text-white" : ""}`}
                      onClick={() => setActiveTab("url")}
                    >
                      <FaLink className="mr-2" /> Image URL
                    </button>
                  </div>

                  {activeTab === "upload" ? (
                    <div className="flex flex-col gap-3">
                      <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-base-300 rounded-2xl cursor-pointer bg-base-200 hover:bg-base-300 transition-all relative">
                        <div className="flex flex-col items-center justify-center pt-5 pb-6 text-center px-4">
                          <FaCloudUploadAlt className={`text-3xl mb-2 ${isUploading ? 'animate-bounce text-primary' : 'text-primary'}`} />
                          <p className="text-xs font-bold opacity-60 uppercase">
                            {isUploading ? "Uploading to Server..." : "Click to select new avatar"}
                          </p>
                        </div>
                        <input type="file" name="imageFile" className="hidden" accept="image/*" onChange={handleFileChange} />
                      </label>
                      {uploadSuccess && (
                        <p className="text-xs font-black text-success uppercase flex items-center gap-1 ml-2">
                          <FaCheckCircle /> Image Uploaded Successfully! Ready to Save.
                        </p>
                      )}
                    </div>
                  ) : (
                    <div className="relative">
                      <FaImage className="absolute left-4 top-4 text-primary opacity-50" />
                      <input
                        type="url"
                        name="photoURL_input"
                        className="input input-bordered w-full pl-12 bg-base-200 focus:input-primary rounded-2xl border-none font-bold h-14"
                        value={photoURL}
                        onChange={(e) => {
                          setPhotoURL(e.target.value);
                          setPreview(e.target.value);
                        }}
                        placeholder="https://example.com/photo.jpg"
                      />
                    </div>
                  )}
                </div>

                <div className="pt-6">
                  <button
                    type="submit"
                    disabled={isUploading}
                    className="btn btn-primary btn-lg rounded-2xl px-12 gap-3 text-white shadow-xl shadow-primary/30 uppercase font-black tracking-widest transition-all hover:scale-105"
                  >
                    {isUploading ? (
                      <span className="loading loading-spinner"></span>
                    ) : (
                      <>
                        <FaSave /> Save Changes
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>

        </div>
      </motion.div>
    </div>
  );
};

export default MyProfile;