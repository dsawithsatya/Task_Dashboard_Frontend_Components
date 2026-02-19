import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import api from '../services/api';

export default function Dashboard(){
  const { user } = useContext(AuthContext);
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [query, setQuery] = useState('');

  const load = async ()=>{
    const res = await api.get('/tasks');
    setTasks(res.data);
  };

  useEffect(()=>{ if(user) load(); }, [user]);

  const add = async (e)=>{
    e.preventDefault();
    if(!title) return;
    await api.post('/tasks', { title, description: desc });
    setTitle(''); setDesc('');
    load();
  };

  const remove = async (id)=>{ await api.delete(`/tasks/${id}`); load(); };

  const toggleStatus = async (task)=>{
    const status = task.status === 'done' ? 'pending' : 'done';
    await api.put(`/tasks/${task.id}`, { status });
    load();
  };

  const filtered = tasks.filter(t => t.title.toLowerCase().includes(query.toLowerCase()));

  return (
    <>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h4>Welcome{user ? `, ${user.name}` : ''}</h4>
        <input className="form-control w-50" placeholder="Search tasks" value={query} onChange={e=>setQuery(e.target.value)} />
      </div>

      <div className="card mb-3">
        <div className="card-body">
          <h5 className="card-title">Add Task</h5>
          <form onSubmit={add} className="row g-2">
            <div className="col-md-5"><input className="form-control" placeholder="Title" value={title} onChange={e=>setTitle(e.target.value)} /></div>
            <div className="col-md-5"><input className="form-control" placeholder="Description" value={desc} onChange={e=>setDesc(e.target.value)} /></div>
            <div className="col-md-2"><button className="btn btn-primary w-100">Add</button></div>
          </form>
        </div>
      </div>

      <div className="row">
        {filtered.map(task => (
          <div className="col-md-4" key={task.id}>
            <div className="card mb-3">
              <div className="card-body">
                <h5 className="card-title">{task.title}</h5>
                <p className="card-text">{task.description}</p>
                <p><strong>Status:</strong> {task.status}</p>
                <button className="btn btn-sm btn-secondary me-2" onClick={()=>toggleStatus(task)}>Toggle</button>
                <button className="btn btn-sm btn-danger" onClick={()=>remove(task.id)}>Delete</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
