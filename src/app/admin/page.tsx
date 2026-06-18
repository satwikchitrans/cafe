'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';

interface GalleryItem {
  id: string;
  title: string | null;
  img: string;
  height: number;
}

interface SignatureItem {
  id: string;
  title: string;
  description: string;
  img: string;
}

export default function AdminDashboard() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'gallery' | 'menu'>('gallery');
  const [gallery, setGallery] = useState<GalleryItem[]>([]);
  const [signatures, setSignatures] = useState<SignatureItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);

  // Form states
  const [newGalleryTitle, setNewGalleryTitle] = useState('');
  const [newGalleryHeight, setNewGalleryHeight] = useState('400');
  const [newSigTitle, setNewSigTitle] = useState('');
  const [newSigDesc, setNewSigDesc] = useState('');
  const [file, setFile] = useState<File | null>(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    const { data: gData } = await supabase.from('gallery').select('*').order('created_at', { ascending: false });
    const { data: sData } = await supabase.from('signatures').select('*').order('created_at', { ascending: false });
    
    if (gData) setGallery(gData);
    if (sData) setSignatures(sData);
    setLoading(false);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/admin/login');
  };

  const uploadImage = async () => {
    if (!file) return null;
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random()}.${fileExt}`;
    const filePath = `uploads/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from('cafe-images')
      .upload(filePath, file);

    if (uploadError) {
      alert('Error uploading image: ' + uploadError.message);
      return null;
    }

    const { data } = supabase.storage.from('cafe-images').getPublicUrl(filePath);
    return data.publicUrl;
  };

  const handleAddGallery = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return alert('Please select an image first.');
    setUploading(true);

    const imageUrl = await uploadImage();
    if (imageUrl) {
      await supabase.from('gallery').insert([{ 
        title: newGalleryTitle || null, 
        img: imageUrl, 
        height: parseInt(newGalleryHeight) || 400 
      }]);
      setNewGalleryTitle('');
      setFile(null);
      await fetchData();
    }
    setUploading(false);
  };

  const handleAddSignature = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return alert('Please select an image first.');
    setUploading(true);

    const imageUrl = await uploadImage();
    if (imageUrl) {
      await supabase.from('signatures').insert([{ 
        title: newSigTitle, 
        description: newSigDesc, 
        img: imageUrl 
      }]);
      setNewSigTitle('');
      setNewSigDesc('');
      setFile(null);
      await fetchData();
    }
    setUploading(false);
  };

  const deleteGallery = async (id: string) => {
    if (!confirm('Are you sure you want to delete this image?')) return;
    await supabase.from('gallery').delete().eq('id', id);
    fetchData();
  };

  const deleteSignature = async (id: string) => {
    if (!confirm('Are you sure you want to delete this signature?')) return;
    await supabase.from('signatures').delete().eq('id', id);
    fetchData();
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white p-6 md:p-12">
      <div className="max-w-6xl mx-auto">
        <header className="flex flex-col md:flex-row md:items-center justify-between mb-12 border-b border-[#222222] pb-6 gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
            <p className="text-[#888888] mt-1">Manage your cafe content and imagery securely.</p>
          </div>
          <button 
            onClick={handleLogout}
            className="px-4 py-2 border border-[#333333] hover:bg-white hover:text-black rounded-lg transition-colors font-medium text-sm w-fit"
          >
            Sign Out
          </button>
        </header>

        <div className="flex gap-4 mb-8 border-b border-[#222222] pb-4">
          <button 
            onClick={() => setActiveTab('gallery')}
            className={`px-6 py-2 rounded-lg font-medium transition-colors ${activeTab === 'gallery' ? 'bg-[#FF6B50] text-white' : 'bg-[#1a1a1a] text-[#888888] hover:text-white'}`}
          >
            Atmosphere Gallery
          </button>
          <button 
            onClick={() => setActiveTab('menu')}
            className={`px-6 py-2 rounded-lg font-medium transition-colors ${activeTab === 'menu' ? 'bg-[#FF6B50] text-white' : 'bg-[#1a1a1a] text-[#888888] hover:text-white'}`}
          >
            Signature Blends
          </button>
        </div>

        <main className="bg-[#111111] border border-[#222222] rounded-2xl p-6 md:p-8 min-h-[500px]">
          {loading ? (
            <div className="text-center py-20 text-[#888888]">Loading securely...</div>
          ) : (
            <>
              {activeTab === 'gallery' && (
                <div>
                  <form onSubmit={handleAddGallery} className="mb-12 bg-[#1a1a1a] p-6 rounded-xl border border-[#333333]">
                    <h3 className="text-lg font-bold mb-4">Add New Image</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <input 
                        type="text" 
                        placeholder="Image Title (Optional)" 
                        value={newGalleryTitle}
                        onChange={(e) => setNewGalleryTitle(e.target.value)}
                        className="px-4 py-2 bg-black border border-[#333333] rounded-lg focus:outline-none focus:border-[#FF6B50] text-white"
                      />
                      <input 
                        type="number" 
                        placeholder="Height (e.g. 400)" 
                        value={newGalleryHeight}
                        onChange={(e) => setNewGalleryHeight(e.target.value)}
                        className="px-4 py-2 bg-black border border-[#333333] rounded-lg focus:outline-none focus:border-[#FF6B50] text-white"
                      />
                      <input 
                        type="file" 
                        accept="image/*"
                        onChange={(e) => setFile(e.target.files?.[0] || null)}
                        className="px-4 py-2 bg-black border border-[#333333] rounded-lg focus:outline-none text-sm text-[#888888] file:mr-4 file:py-1 file:px-3 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-[#333333] file:text-white"
                      />
                    </div>
                    <button disabled={uploading} type="submit" className="mt-4 px-6 py-2 bg-[#FF6B50] hover:bg-[#E55A40] text-white font-semibold rounded-lg transition-colors disabled:opacity-50">
                      {uploading ? 'Uploading...' : 'Upload Image'}
                    </button>
                  </form>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {gallery.map(item => (
                      <div key={item.id} className="bg-[#1a1a1a] border border-[#333333] rounded-xl overflow-hidden group">
                        <div className="h-48 w-full bg-cover bg-center" style={{ backgroundImage: `url(${item.img})` }}></div>
                        <div className="p-4 flex items-center justify-between">
                          <div>
                            <p className="font-bold">{item.title || 'Untitled'}</p>
                            <p className="text-xs text-[#888888]">Height: {item.height}px</p>
                          </div>
                          <button onClick={() => deleteGallery(item.id)} className="text-red-500 hover:text-red-400 text-sm font-semibold">Delete</button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'menu' && (
                <div>
                  <form onSubmit={handleAddSignature} className="mb-12 bg-[#1a1a1a] p-6 rounded-xl border border-[#333333]">
                    <h3 className="text-lg font-bold mb-4">Add New Signature Blend</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <input 
                        type="text" 
                        required
                        placeholder="Blend Name" 
                        value={newSigTitle}
                        onChange={(e) => setNewSigTitle(e.target.value)}
                        className="px-4 py-2 bg-black border border-[#333333] rounded-lg focus:outline-none focus:border-[#FF6B50] text-white"
                      />
                      <input 
                        type="file" 
                        required
                        accept="image/*"
                        onChange={(e) => setFile(e.target.files?.[0] || null)}
                        className="px-4 py-2 bg-black border border-[#333333] rounded-lg focus:outline-none text-sm text-[#888888] file:mr-4 file:py-1 file:px-3 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-[#333333] file:text-white"
                      />
                      <textarea 
                        required
                        placeholder="Description" 
                        value={newSigDesc}
                        onChange={(e) => setNewSigDesc(e.target.value)}
                        className="px-4 py-2 bg-black border border-[#333333] rounded-lg focus:outline-none focus:border-[#FF6B50] text-white md:col-span-2 min-h-[100px]"
                      />
                    </div>
                    <button disabled={uploading} type="submit" className="mt-4 px-6 py-2 bg-[#FF6B50] hover:bg-[#E55A40] text-white font-semibold rounded-lg transition-colors disabled:opacity-50">
                      {uploading ? 'Uploading...' : 'Add Blend'}
                    </button>
                  </form>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {signatures.map(item => (
                      <div key={item.id} className="bg-[#1a1a1a] border border-[#333333] rounded-xl overflow-hidden flex flex-col md:flex-row">
                        <div className="h-48 md:h-auto md:w-1/3 bg-cover bg-center" style={{ backgroundImage: `url(${item.img})` }}></div>
                        <div className="p-6 md:w-2/3 flex flex-col justify-between">
                          <div>
                            <h4 className="text-xl font-bold text-[#FF6B50] mb-2">{item.title}</h4>
                            <p className="text-[#888888] text-sm leading-relaxed">{item.description}</p>
                          </div>
                          <button onClick={() => deleteSignature(item.id)} className="text-red-500 hover:text-red-400 text-sm font-semibold w-fit mt-4">Delete Blend</button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </main>
      </div>
    </div>
  );
}
