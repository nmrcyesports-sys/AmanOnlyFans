import React, { useState } from 'react';
import { useProfile, ProfileData } from '../context/ProfileContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const processImage = (file: File): Promise<string> => {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const MAX_WIDTH = 800;
        const MAX_HEIGHT = 800;
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > MAX_WIDTH) {
            height *= MAX_WIDTH / width;
            width = MAX_WIDTH;
          }
        } else {
          if (height > MAX_HEIGHT) {
            width *= MAX_HEIGHT / height;
            height = MAX_HEIGHT;
          }
        }
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx?.drawImage(img, 0, 0, width, height);
        resolve(canvas.toDataURL(file.type, 0.7)); // Compress to 70% quality
      };
      img.src = e.target?.result as string;
    };
    reader.readAsDataURL(file);
  });
};

export default function Admin() {
  const { data, updateProfile } = useProfile();
  const [formData, setFormData] = useState<ProfileData>(data);
  const [saved, setSaved] = useState(false);

  // Sync formData when data loads from Firestore
  React.useEffect(() => {
    setFormData(data);
  }, [data]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setSaved(false);
  };

  const handleProfileImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const base64 = await processImage(file);
      setFormData((prev) => ({ ...prev, profileImage: base64 }));
      setSaved(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile(formData);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="w-full min-h-screen bg-[#F7F5F0] flex flex-col pt-32">
       <Navbar />
       
       <div className="flex-grow flex flex-col items-center px-6 pb-24">
         <div className="w-full max-w-2xl bg-white rounded-[2rem] p-8 md:p-12 shadow-2xl border border-[#161616]/5">
            <h1 className="text-4xl font-display text-[#161616] mb-2 tracking-tight">Admin Dashboard</h1>
            <p className="text-[#777777] font-serif mb-10">Update your public identity details.</p>

            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
               <div className="flex flex-col gap-2">
                 <label className="text-[10px] font-sans uppercase tracking-[0.2em] text-[#777777]">Display Name</label>
                 <input name="displayName" value={formData.displayName} onChange={handleChange} className="w-full p-4 rounded-xl border border-[#161616]/10 bg-[#F7F5F0] font-sans text-sm focus:outline-none focus:border-[#4D7CFE] transition-colors" />
               </div>

               <div className="flex flex-col gap-2">
                 <label className="text-[10px] font-sans uppercase tracking-[0.2em] text-[#777777]">Username</label>
                 <input name="username" value={formData.username} onChange={handleChange} className="w-full p-4 rounded-xl border border-[#161616]/10 bg-[#F7F5F0] font-sans text-sm focus:outline-none focus:border-[#4D7CFE] transition-colors" />
               </div>

               <div className="flex flex-col gap-2">
                 <label className="text-[10px] font-sans uppercase tracking-[0.2em] text-[#777777]">Upload Profile Image</label>
                 <input 
                   type="file" 
                   accept="image/*" 
                   onChange={handleProfileImageUpload} 
                   className="w-full p-4 rounded-xl border border-[#161616]/10 bg-[#F7F5F0] font-sans text-sm focus:outline-none focus:border-[#4D7CFE] transition-colors cursor-pointer file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-[10px] file:font-sans file:uppercase file:tracking-[0.2em] file:bg-[#161616] file:text-white hover:file:bg-[#4D7CFE] hover:file:text-white" 
                 />
                 {formData.profileImage && formData.profileImage.startsWith('data:image') && (
                   <div className="text-[10px] font-sans text-green-600 mt-1">Image uploaded successfully.</div>
                 )}
               </div>

               <div className="flex flex-col gap-2">
                 <label className="text-[10px] font-sans uppercase tracking-[0.2em] text-[#777777]">Category</label>
                 <input name="category" value={formData.category} onChange={handleChange} className="w-full p-4 rounded-xl border border-[#161616]/10 bg-[#F7F5F0] font-sans text-sm focus:outline-none focus:border-[#4D7CFE] transition-colors" />
               </div>
               
               <div className="flex flex-col gap-2">
                 <label className="text-[10px] font-sans uppercase tracking-[0.2em] text-[#777777]">Location</label>
                 <input name="location" value={formData.location} onChange={handleChange} className="w-full p-4 rounded-xl border border-[#161616]/10 bg-[#F7F5F0] font-sans text-sm focus:outline-none focus:border-[#4D7CFE] transition-colors" />
               </div>

               <div className="flex flex-col gap-2">
                 <label className="text-[10px] font-sans uppercase tracking-[0.2em] text-[#777777]">Other Profile (Instagram ID)</label>
                 <input name="otherProfile" value={formData.otherProfile || ''} onChange={handleChange} className="w-full p-4 rounded-xl border border-[#161616]/10 bg-[#F7F5F0] font-sans text-sm focus:outline-none focus:border-[#4D7CFE] transition-colors" />
               </div>

               <div className="grid grid-cols-3 gap-4">
                  <div className="flex flex-col gap-2">
                     <label className="text-[10px] font-sans uppercase tracking-[0.2em] text-[#777777]">Posts</label>
                     <input name="posts" type="number" value={formData.posts} onChange={handleChange} className="w-full p-4 rounded-xl border border-[#161616]/10 bg-[#F7F5F0] font-sans text-sm" />
                  </div>
                  <div className="flex flex-col gap-2">
                     <label className="text-[10px] font-sans uppercase tracking-[0.2em] text-[#777777]">Followers</label>
                     <input name="followers" type="number" value={formData.followers} onChange={handleChange} className="w-full p-4 rounded-xl border border-[#161616]/10 bg-[#F7F5F0] font-sans text-sm" />
                  </div>
                  <div className="flex flex-col gap-2">
                     <label className="text-[10px] font-sans uppercase tracking-[0.2em] text-[#777777]">Following</label>
                     <input name="following" type="number" value={formData.following} onChange={handleChange} className="w-full p-4 rounded-xl border border-[#161616]/10 bg-[#F7F5F0] font-sans text-sm" />
                  </div>
               </div>

               <div className="border-t border-[#161616]/10 pt-6 mt-4">
                  <h3 className="text-xl font-display text-[#161616] mb-4 tracking-tight">Highlights Images</h3>
                  {formData.highlights?.map((highlight, index) => (
                    <div key={index} className="flex flex-col gap-2 mb-4">
                      <label className="text-[10px] font-sans uppercase tracking-[0.2em] text-[#777777]">Upload {highlight.title} Image</label>
                      <input 
                         type="file"
                         accept="image/*"
                         onChange={async (e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                               const base64 = await processImage(file);
                               const newHighlights = [...(formData.highlights || [])];
                               newHighlights[index].coverImage = base64;
                               setFormData({ ...formData, highlights: newHighlights });
                               setSaved(false);
                            }
                         }} 
                         className="w-full p-4 rounded-xl border border-[#161616]/10 bg-[#F7F5F0] font-sans text-sm focus:outline-none focus:border-[#4D7CFE] transition-colors cursor-pointer file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-[10px] file:font-sans file:uppercase file:tracking-[0.2em] file:bg-[#161616] file:text-white hover:file:bg-[#4D7CFE]" 
                      />
                      {highlight.coverImage?.startsWith('data:image') && (
                        <div className="text-[10px] font-sans text-green-600 mt-1">Image uploaded successfully.</div>
                      )}
                    </div>
                  ))}
               </div>

               <div className="border-t border-[#161616]/10 pt-6 mt-4">
                  <h3 className="text-xl font-display text-[#161616] mb-4 tracking-tight">Additional Visuals</h3>
                  {[0, 1].map((index) => (
                    <div key={index} className="flex flex-col gap-2 mb-4">
                      <label className="text-[10px] font-sans uppercase tracking-[0.2em] text-[#777777]">Upload Visual {index + 1}</label>
                      <input 
                         type="file"
                         accept="image/*"
                         onChange={async (e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                               const base64 = await processImage(file);
                               const newVisuals = [...(formData.visuals || [])];
                               newVisuals[index] = base64;
                               setFormData({ ...formData, visuals: newVisuals });
                               setSaved(false);
                            }
                         }} 
                         className="w-full p-4 rounded-xl border border-[#161616]/10 bg-[#F7F5F0] font-sans text-sm focus:outline-none focus:border-[#4D7CFE] transition-colors cursor-pointer file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-[10px] file:font-sans file:uppercase file:tracking-[0.2em] file:bg-[#161616] file:text-white hover:file:bg-[#4D7CFE]" 
                      />
                      {formData.visuals?.[index]?.startsWith('data:image') && (
                        <div className="text-[10px] font-sans text-green-600 mt-1">Image uploaded successfully.</div>
                      )}
                    </div>
                  ))}
               </div>

               <button type="submit" className="w-full mt-6 bg-[#161616] text-white py-4 rounded-full font-sans uppercase tracking-[0.2em] text-xs hover:bg-[#4D7CFE] transition-colors">
                 {saved ? 'SAVED ✓' : 'SAVE CHANGES'}
               </button>

               <a href="/" className="w-full text-center mt-2 text-[#777777] text-xs font-sans uppercase tracking-[0.2em] hover:text-[#161616]">
                 ← RETURN TO PROFILE
               </a>
            </form>
         </div>
       </div>

       <Footer />
    </div>
  );
}
