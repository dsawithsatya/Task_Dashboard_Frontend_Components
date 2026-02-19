import React, { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import api from '../services/api';

export default function Profile(){
  const { user, loadProfile } = useContext(AuthContext);
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [msg, setMsg] = useState('');

  const save = async (e) =>{
    e.preventDefault();
    try{
      const res = await api.put('/profile', { name, email });
      setMsg('Profile updated');
      loadProfile();
    }catch(err){ setMsg(err?.response?.data?.message || 'Update failed'); }
  };

  return (
    <div className="col-md-6">
      <h3>Profile</h3>
      {msg && <div className="alert alert-info">{msg}</div>}
      <form onSubmit={save}>
        <div className="mb-3">
          <label className="form-label">Name</label>
          <input className="form-control" value={name} onChange={e=>setName(e.target.value)} />
        </div>
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input className="form-control" value={email} onChange={e=>setEmail(e.target.value)} />
        </div>
        <button className="btn btn-primary">Save</button>
      </form>
    </div>
  );
}
