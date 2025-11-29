import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import PageHeader from '../components/PageHeader';

const ProfilePage = () => {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState({
    firstName: 'Prénom',
    lastName: 'Nom',
    email: 'utilisateur@example.com',
    phone: '+212 6 00 00 00 00',
    password: '********',
    confirmPassword: '',
    profileImage: null,
    uploadedCourses: [
      { id: 1, title: 'Mathématiques avancées', group: 'Groupe A', date: '2023-11-15' },
      { id: 2, title: 'Physique quantique', group: 'Groupe B', date: '2023-11-10' },
    ]
  });

  const [formData, setFormData] = useState({ ...userData, confirmPassword: '' });
  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);

  useEffect(() => {
    // Load user data from localStorage or API
    const savedData = localStorage.getItem('userProfile');
    if (savedData) {
      const parsedData = JSON.parse(savedData);
      setUserData(parsedData);
      setFormData(parsedData);
      if (parsedData.profileImage) {
        setPreview(parsedData.profileImage);
      }
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const newData = {
      ...formData,
      [name]: value
    };
    
    // Check password match when either password field changes
    if (name === 'password' || name === 'confirmPassword') {
      const pass = name === 'password' ? value : formData.password;
      const confirm = name === 'confirmPassword' ? value : formData.confirmPassword;
      setPasswordsMatch(!pass || !confirm || pass === confirm);
    }
    
    setFormData(newData);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    if (formData.password && formData.password !== formData.confirmPassword) {
      setPasswordsMatch(false);
      return;
    }
    
    const updatedData = {
      ...formData,
      profileImage: preview || userData.profileImage
    };
    
    // In a real app, you would send this to your backend
    localStorage.setItem('userProfile', JSON.stringify(updatedData));
    setUserData(updatedData);
    setPasswordsMatch(true);
  };
  
  const handleDeleteAccount = () => {
    if (isDeleting) {
      // In a real app, you would call your API to delete the account
      localStorage.removeItem('userProfile');
      navigate('/login');
    } else {
      setIsDeleting(true);
      // Reset deletion state after 3 seconds if not confirmed
      setTimeout(() => setIsDeleting(false), 3000);
    }
  };

  const handleLogout = () => {
    // In a real app, you would clear the auth token
    navigate('/login');
  };

  const removeCourse = (courseId) => {
    if (window.confirm('Voulez-vous vraiment supprimer ce cours ?')) {
      const updatedCourses = userData.uploadedCourses.filter(course => course.id !== courseId);
      const updatedData = { ...userData, uploadedCourses: updatedCourses };
      setUserData(updatedData);
      setFormData(updatedData);
      localStorage.setItem('userProfile', JSON.stringify(updatedData));
    }
  };

  return (
    <div className="flex h-screen bg-white">
      <Sidebar activeMenuItem="profile" />

      <main className="flex-1 flex flex-col bg-white overflow-hidden">
        <PageHeader 
          greeting={`BONJOUR ${userData.firstName.toUpperCase()}`}
          searchPlaceholder="Rechercher..."
        />

        <div className="flex-1 overflow-y-auto bg-[#FFFEEC] p-6">
          <div className="max-w-4xl mx-auto">
            {/* Profile Card */}
            <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
              <div className="flex flex-col md:flex-row items-start md:items-center gap-6 mb-6">
                <div className="relative group">
                  <div className="w-32 h-32 rounded-full bg-gray-200 overflow-hidden">
                    {preview || userData.profileImage ? (
                      <img 
                        src={preview || userData.profileImage} 
                        alt="Profile" 
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-400">
                        <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                      </div>
                    )}
                  </div>
                  <label className="absolute bottom-0 right-0 bg-[#7A4BC7] text-white p-2 rounded-full cursor-pointer hover:bg-[#6a3fb0] transition-colors">
                    <input 
                      type="file" 
                      className="hidden" 
                      onChange={handleFileChange}
                      accept="image/*"
                    />
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </label>
                </div>
                
                <div className="flex-1 space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Prénom</label>
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-[#7A4BC7] focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Nom</label>
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-[#7A4BC7] focus:border-transparent"
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-[#7A4BC7] focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Téléphone</label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-[#7A4BC7] focus:border-transparent"
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Mot de passe</label>
                      <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        className={`w-full p-2 border rounded focus:ring-2 focus:ring-[#7A4BC7] focus:border-transparent ${
                          formData.password && formData.confirmPassword
                            ? passwordsMatch ? 'border-green-500' : 'border-red-500'
                            : 'border-gray-300'
                        }`}
                        placeholder="••••••••"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Confirmer le mot de passe</label>
                      <input
                        type="password"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                        className={`w-full p-2 border rounded focus:ring-2 focus:ring-[#7A4BC7] focus:border-transparent ${
                          formData.password && formData.confirmPassword
                            ? passwordsMatch ? 'border-green-500' : 'border-red-500'
                            : 'border-gray-300'
                        }`}
                        placeholder="••••••••"
                      />
                      {!passwordsMatch && (
                        <p className="mt-1 text-sm text-red-600">Les mots de passe ne correspondent pas</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end">
                <button
                  onClick={handleSave}
                  className="px-6 py-2 bg-[#7A4BC7] text-white rounded-lg hover:bg-[#6a3fb0] transition-colors"
                >
                  Enregistrer les modifications
                </button>
              </div>
            </div>

            {/* Account Management */}
            <div className="bg-white rounded-xl shadow-sm p-6 mb-6 border border-gray-100">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Gestion du compte</h2>
              
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 bg-gray-50 rounded-lg">
                  <div>
                    <h3 className="font-medium text-gray-900">Déconnexion</h3>
                    <p className="text-sm text-gray-500">Déconnectez-vous de votre compte</p>
                  </div>
                  <button
                    onClick={() => navigate('/login')}
                    className="mt-2 sm:mt-0 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors text-sm font-medium"
                  >
                    Se déconnecter
                  </button>
                </div>
                
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 bg-red-50 rounded-lg border border-red-100">
                  <div>
                    <h3 className="font-medium text-red-800">Supprimer le compte</h3>
                    <p className="text-sm text-red-600">Cette action est irréversible et supprimera toutes vos données</p>
                  </div>
                  <button
                    onClick={handleDeleteAccount}
                    className={`mt-2 sm:mt-0 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      isDeleting 
                        ? 'bg-red-700 text-white hover:bg-red-800' 
                        : 'bg-red-600 text-white hover:bg-red-700'
                    }`}
                  >
                    {isDeleting ? 'Confirmer la suppression' : 'Supprimer mon compte'}
                  </button>
                </div>
              </div>
            </div>

            {/* Uploaded Courses */}
            <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Mes cours téléchargés</h2>
              
              {userData.uploadedCourses.length > 0 ? (
                <div className="space-y-4">
                  {userData.uploadedCourses.map((course) => (
                    <div key={course.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
                      <div>
                        <h3 className="font-medium text-gray-900">{course.title}</h3>
                        <p className="text-sm text-gray-500">{course.group} • {new Date(course.date).toLocaleDateString('fr-FR')}</p>
                      </div>
                      <button
                        onClick={() => removeCourse(course.id)}
                        className="text-red-500 hover:text-red-700"
                        title="Supprimer le cours"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 text-center py-4">Aucun cours téléchargé pour le moment.</p>
              )}
            </div>

          </div>
        </div>
      </main>
    </div>
  );
};

export default ProfilePage;
