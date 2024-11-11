import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { postscontext } from '../../context/PostContext';
import { usercontext } from '../../context/AuthContext';
// import { 
//   Camera, 
//   MapPin, 
//   ChevronDown, 
//   X,
//   Smile,
//   UserPlus,
//   Settings
// } from 'lucide-react';

const AddPost = () => {
    const [selectedImage, setSelectedImage] = useState(null);
    let [previewUrl, setPreviewUrl] = useState(null);
    let [data, setdata] = useState({})
    let [image, setimage] = useState(null)
    let { addpost } = useContext(postscontext)
    let navigate= useNavigate()
    // console.log(addpost);


    // const handleImageChange = (e) => {
    //     if (e.target.files[0]) {
    //         setSelectedImage(e.target.files[0]);
    //         setPreviewUrl('/api/placeholder/400/400'); 
    //     }
    // };

    let { currentuser } = useContext(usercontext)
    // console.log(currentuser);
    
    

    const handleSubmit = (e) => {
        e.preventDefault();
        data = { ...data, "image": image,"name":currentuser.name}
        // console.log(data);
        addpost(data)
        setTimeout(() => {
            navigate("/")
        }, 1000);
    };
    let handleinput = (e) => {
        let { name, value } = e.target
        setdata({ ...data, [name]: value })
        if (name == "image") {
            let file= e.target.files[0]
            let reader = new FileReader()

            reader.onload=()=>{
               setimage(reader.result)
            }
            if (file) {
                reader.readAsDataURL(file)
            }
            // setdata({...data,[name]:value})
            // setPreviewUrl('/api/placeholder/400/400');
            setPreviewUrl(file);
        }
    }

    return (
        <div className="max-w-xl mx-auto bg-white rounded-xl shadow-lg">
            {/* Header */}
            <form action="" onSubmit={handleSubmit}>
                <div className="border-b border-gray-200">
                    <div className="p-4 flex items-center justify-between">
                        <Link to={"/"}>
                            <button className="text-red-500 font-medium">Cancel</button>
                        </Link>
                        <h2 className="text-lg font-semibold">New Post</h2>
                        <button type='submit'
                            // className="text-blue-500 font-semibold disabled:opacity-50" disabled={!selectedImage}> Share
                            className="text-blue-500 font-semibold disabled:opacity-50" >Share
                        </button>
                    </div>
                </div>

                <div className="p-4">
                    {!previewUrl ? (
                        <div className="border-2 border-dashed border-gray-300 rounded-lg p-8">
                            <div className="text-center">
                                <div className="mt-4">
                                    <label className="cursor-pointer">
                                        <span className="mt-2 block text-sm font-semibold text-blue-500">
                                            Select from computer
                                        </span>
                                        <input
                                            name='image'
                                            type="file"
                                            className="hidden"
                                            accept="image/*"
                                            onChange={(e) => handleinput(e)}
                                        />
                                    </label>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="relative">
                            <img
                                src={image}
                                alt="Preview"
                                className="w-full rounded-lg h-[400px] object-cover"
                            />
                            <button
                                onClick={() => {
                                    setSelectedImage(null);
                                    setPreviewUrl(null);
                                }}
                                className="absolute top-2 right-2 p-1 bg-gray-800 bg-opacity-60 rounded-full text-white"
                            >
                                cancel
                            </button>
                        </div>
                    )}

                    {/* Caption Area */}
                    <div className="mt-4">
                        <div className="flex items-start border rounded-lg p-3">
                            <textarea
                                placeholder="Write a caption..."
                                onChange={(e) => handleinput(e)}
                                className="w-full border-none focus:ring-0 resize-none"
                                rows={4}
                                name='caption'
                            />
                            <button className="ml-2 text-xl text-gray-500">
                                {/* <Smile size={24} /> */}
                            </button>
                        </div>
                    </div>

                    {/* Location */}
                    <div className="border-t border-gray-200 py-3">
                        <div className="flex items-center px-2">
                            {/* <MapPin className="text-gray-500" size={20} /> */}
                            <input
                                type="text"
                                name='location'
                                placeholder="Add location"
                                onChange={(e) => handleinput(e)}
                                className="ml-2 w-full border-none focus:ring-0"
                            />
                        </div>
                    </div>

                    {/* Advanced Settings */}
                    <div className="border-t border-gray-200 py-3">
                        <button type='button' className="flex items-center justify-between w-full px-2">
                            <div className="flex items-center">
                                {/* <Settings className="text-gray-500 mr-2" size={20} /> */}
                                <span className="text-sm">Advanced settings</span>
                            </div>
                            {/* <ChevronDown className="text-gray-500" size={20} /> */}
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default AddPost;