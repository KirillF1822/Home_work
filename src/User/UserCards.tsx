/* import { setUncaughtExceptionCaptureCallback } from 'process'; */
import React, {ChangeEvent, useMemo, useState, FormEvent} from 'react';
import {USERS} from './users'
import { IUser } from './interfaces';
import './UserCards.css'


const UserCards = () => {
    const initialValue = {
        name: '',
        username: '',
        phone: '',
        email: '',
        website: ''
    }

    
    const [users, setUsers] = useState(USERS);
    const [search, setSearch] = useState<string>(''); 
    const [isShowEdit, setIsShowEdit] = useState<boolean>(false);
    const [userValue, setUserValue] = useState<any>(initialValue);
    const [newUserId, setNewUserId] = useState<number>(USERS.length + 1);

    const deleteUser = (id: number) => {
        const confirm = window.confirm('Do you want delete this user?');
        setUsers(users.filter(user => user.id !== id))
    }


    const searchedUser = useMemo(():IUser[] => {
        if (search) {
            return users.filter((user) => user.username.toLowerCase().includes(search.toLowerCase()));
        }
        return users;

        /* search ?
            users.filter((user) => user.username.toLowerCase().includes(search.toLowerCase()))
            :
            users; одно и тоже что и проверять if*/
    },[search, users]); 

    const onChange = (event: ChangeEvent<HTMLInputElement>) => {
        const field = event.target.id;
        const value = event.target.value;
        setUserValue({...userValue, [field]: value})
    }

    const addUser = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const userValueWithId = {...userValue,id: newUserId}
        setNewUserId(newUserId + 1);
        setUsers([...users, userValueWithId]);
        setUserValue(initialValue);
    }
    
    /* console.log(USERS[0].name);
    console.log(USERS[0]["name"]) 3220489A068PB0 */

  return (
      <div className="row row-cols-1 row-cols-md-3 g-4">
            <h1 className="text-center w-100">User cards</h1>
            <div>
                <button className="btn btn-success" onClick={() => setIsShowEdit(!isShowEdit)}>Show Form for Add user</button>
                {isShowEdit && 
                <form onSubmit={event => addUser(event)}>
                    
                    {Object.keys(USERS[0]).map(field => {
                         if (field === "company" || field === "id" || field === "address") return
                         return <input className="form-control mt-2"
                         key={field}
                         required 
                         id={field} 
                         type={field === 'email' ? 'email' : 'text'}
                         value={userValue[field]}
                         placeholder={`Input user ${field}`}
                         onChange={event => onChange(event)}
                         />
                    }
                       
                    )}

                    <button className='btn btn-success mt-2'>Add user</button>
                </form>}
            </div>

            <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">@</span>
            <input type="text" 
            className="form-control"
            placeholder="Username" 
            aria-label="Username" 
            aria-describedby="basic-addon1"
            onChange={(event) => setSearch(event.target.value)}
            />
            
        </div>
        {searchedUser.map(user => <div className="col" key={user.id}>
            <div className="card h-100">
                <div className="card-body" key={user.id}>
                    <h5 className="card-title">{user.name}</h5>
                    <p className="card-text">{user.username}</p>
                    <p className="card-text">{user.phone}</p>
                    <p className="card-text">{user.email}</p>
                    <p className="card-text">{user.website}</p>
                    
                </div>
                <div className="card-footer">
                    <button className="btn btn-danger"  onClick={() => deleteUser(user.id)}>
                        DELETE USER
                    </button>
                </div>
            </div>
        </div>
        
        )}
      </div>     
    
  );
};

export default UserCards
