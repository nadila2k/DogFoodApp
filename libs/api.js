import {
  addDoc,
  collection,
  getDocs,
  getDoc,
  doc,
  updateDoc,
  query,
  where,
  orderBy,
} from "firebase/firestore";
import { auth, db } from "./../firebaseConfig";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

const signUpApi = async (username, email, password) => {
  try {
    // Create user in firebase authentication
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const { user } = userCredential;

    // Update user data in firebase FireStore
    await addDoc(collection(db, "users"), {
      uid: user.uid,
      username: username,
    });
    console.log(" ✅ User signed up successfully:", user.uid);
    return {
      status: true,
      message: "User signed up successfully",
    };
  } catch (error) {
    // Handle already used email error
    if (error.code === "auth/email-already-in-use") {
      return {
        status: false,
        message: "The email address is already in use by another account.",
      };
    } else {
      console.error(" 🔥 Error signing up:", error);
      return {
        status: false,
        message: error.message,
      };
    }
  }
};

const signInApi = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const { user } = userCredential;
    console.log(" ✅ User signed in successfully:", user.uid);
    return {
      status: true,
      message: "User signed in successfully",
    };
  } catch (error) {
    // Handled invalid auth error
    if (error.code === "auth/invalid-credential") {
      return {
        status: false,
        message: "The provided credential is invalid.",
      };
    }
    console.error(" 🔥 Error signing in:", error);
    return {
      status: false,
      message: error.message,
    };
  }
};

const signOutApi = async () => {
  try {
    await auth.signOut();
    console.log(" ✅ User signed out successfully");
    return {
      status: true,
      message: "User signed out successfully",
    };
  } catch (error) {
    console.error(" 🔥 Error signing out:", error);
    return {
      status: false,
      message: error.message,
    };
  }
};

const fetchProducts = async (queryParams) => {
  console.log("Fil obj  🔍 ", queryParams);
  try {
    let productsRef = collection(db, "products");

    // Filter Category
    if (queryParams.category) {
      productsRef = query(
        productsRef,
        where("category", "==", queryParams.category)
      );
    }

    // Search by Name
    if (queryParams.search) {
      // Convert searchText to lowercase for case-insensitive search
      const searchTextLower = queryParams.search.toLowerCase();
      productsRef = query(
        productsRef,
        where("slug", ">=", searchTextLower),
        where("slug", "<=", searchTextLower + "\uf8ff")
      );
    }

    // Sort by selections
    if (queryParams.sort === "asc") {
      productsRef = query(productsRef, orderBy("price", "asc"));
    } else if (queryParams.sort === "desc") {
      productsRef = query(productsRef, orderBy("price", "desc"));
    } else if (queryParams.sort === "brand") {
      productsRef = query(productsRef, orderBy("brand", "asc"));
    }

    const querySnapshot = await getDocs(productsRef);
    const data = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    console.log(" ✅ Products fetching successfully");
    return {
      status: true,
      data: data,
    };
  } catch (error) {
    console.error(" 🔥 Error fetching products:", error);
    return {
      status: false,
      message: error.message,
    };
  }
};

const fetchUserData = async (uId) => {
  try {
    const q = query(collection(db, "users"), where("uid", "==", uId));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      const userData = querySnapshot.docs[0].data();
      console.log(" ✅ User data fetched successfully:", userData);
      return {
        status: true,
        data: userData,
      };
    } else {
      console.log(" ❌ No such user!");
      return {
        status: false,
        message: "No such user!",
      };
    }
  } catch (error) {
    console.error(" 🔥 Error fetching user data:", error);
    return {
      status: false,
      message: error.message,
    };
  }
};

const updateUserData = async (uid, updatedUserData) => {
  try {
    const q = query(collection(db, "users"), where("uid", "==", uid));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      const userDocRef = querySnapshot.docs[0].ref;
      await updateDoc(userDocRef, updatedUserData);
      console.log(" ✅ User data updated successfully");
      return {
        status: true,
        message: "User data updated successfully",
      };
    } else {
      console.log(" ❌ No such user!");
      return {
        status: false,
        message: "No such user!",
      };
    }
  } catch (error) {
    console.error(" 🔥 Error updating user data:", error);
    return {
      status: false,
      message: error.message,
    };
  }
};

const fetchProductById = async (productId) => {
  try {
    const docRef = doc(db, "products", productId);
    const docSnapshot = await getDoc(docRef);

    if (docSnapshot.exists()) {
      const productData = docSnapshot.data();
      console.log(" ✅ Fetch product successfully");
      return {
        status: true,
        data: {
          id: docSnapshot.id,
          ...productData,
        },
      };
    } else {
      return {
        status: false,
        message: "Product not found",
      };
    }
  } catch (error) {
    console.error("🔥 Error fetching product:", error);
    return {
      status: false,
      message: error.message,
    };
  }
};

const fetchPosts = async () => {
  try {
    const postsRef = collection(db, "posts");
    const querySnapshot = await getDocs(postsRef);
    const data = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    console.log(" ✅ Posts fetched successfully");
    return {
      status: true,
      data: data,
    };
  } catch (error) {
    console.error(" 🔥 Error fetching posts:", error);
    return {
      status: false,
      message: error.message,
    };
  }
};


const getCurrentUserUid = () => {
  return auth.currentUser ? auth.currentUser.uid : null;
};

export {
  signUpApi,
  signInApi,
  signOutApi,
  fetchProducts,
  fetchUserData,
  updateUserData,
  fetchProductById,
  fetchPosts,
  getCurrentUserUid,
};
