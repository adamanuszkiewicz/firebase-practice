import React from 'react';
import './App.css';
import { auth, db } from './firebase/init';
import { collection, addDoc, getDocs, getDoc, doc, query, where, updateDoc, deleteDoc } from "firebase/firestore";
import {
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";

function App() {
  const [user, setUser] = React.useState({});
  const [loading, setLoading] = React.useState(true);

  async function updatePost() {
    const hardcodedId = "AEzPNEOvOMviCeVIjP2V";
    const postRef = doc(db, "posts", hardcodedId);
    const post = await getPostById(hardcodedId);
    console.log(post)
    const newPost = {
      ...post,
      title: "Land a 400k Job!"
    };
    console.log(newPost);
    updateDoc(postRef, newPost);
  }

  function deletePost() {
    const hardcodedId = "AEzPNEOvOMviCeVIjP2V";
    const postRef = doc(db, "posts", hardcodedId);
    deleteDoc(postRef);
  }


  function createPost() {
    const post = {
      title: "Finish Interview Section",
      description: "Do Frontend Simplified",
      uid: user.uid,
    };
    addDoc(collection(db, "posts"), post)
  }

  async function getAllPosts() {
      const { docs } = await getDocs(collection(db, "posts"));
      const posts = docs.map(elem => ({...elem.data(), id: elem.id }));
      console.log(posts);
  }

  async function getPostById(id) {
    const postRef = doc(db, "posts", id);
    const postSnap = await getDoc(postRef);
    return postSnap.data();
  }

  async function getPostByUid() {
    const postCollectionRef = await query(
      collection(db, "posts"),
      where("uid", "==", user.uid)
    );
    const { docs } = await getDocs(postCollectionRef);
    console.log(docs.map(doc => doc.data()));
  }

  React.useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setLoading(false)
      if (user) {
        setUser(user);
      }
      else {
        setUser(null);
      }
    })
    return() => unsubscribe();
  }, []);

  function register() {
    console.log('register')
    createUserWithEmailAndPassword(auth, 'adam@email.com', 'test123')
      .then((user) => {
      })
      .catch((error) => {
      })
  }

  function login() {
    signInWithEmailAndPassword(auth, 'adam@email.com', 'test123')
      .then(({ user }) => {
        console.log(user)
        setUser(user) 
      })
      .catch((error) => {
        console.log(error.message);
      })
  }

  function logout() {
    signOut(auth);
    setUser({});
  }

  const button = ({ btn }) => {
    function pageLoaded() {
      console.log('pageLoaded')
    }
  }

  return (
    <div className="App">
      <nav className="nav__bar--skeleton">
        <button className="skeleton register__btn--skeleton" onClick={register}>Register</button>
        <button className="skeleton login__btn--skeleton" onClick={login}>Login</button>
        <button className="skeleton logout__btn--skeleton" onClick={logout}>A</button>
        {loading ? "Loading..." : user ? user.email : "Not logged in"}
        <button onClick={createPost}>Create Post</button>
        <button onClick={getAllPosts}>Get All Posts</button>
        <button onClick={getPostById}>Get Post By Id</button>
        <button onClick={getPostByUid}>Get Post By Uid</button>
        <button onClick={updatePost}>Update Post</button>
        <button onClick={deletePost}>Delete Post</button>
      </nav>
    </div>
  );
}

export default App;
