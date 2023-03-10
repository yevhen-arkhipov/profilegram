import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth';

import { auth } from '../../firebase/config';
import { uploadPhoto } from '../../firebase/storageUse';
import { authSlice } from './authReducer';

const { updateUserProfile, authLogOut, authSetChange, changeAvatarPhoto } =
  authSlice.actions;

export const authSignUp =
  ({ name, email, password, photo }) =>
  async (dispatch, getState) => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);

      const user = await auth.currentUser;

      const avatarURL = photo ? await uploadPhoto(photo, uid) : null;

      await updateProfile(user, { displayName: name, photoURL: avatarURL });

      const { uid, displayName, photoURL } = auth.currentUser;

      const userUpdateProfile = {
        userId: uid,
        name: displayName,
        userEmail: email,
        avatURL: photoURL,
      };

      dispatch(updateUserProfile(userUpdateProfile));
    } catch (error) {
      console.log(error);
    }
  };

export const authSignIn =
  ({ email, password }) =>
  async (dispatch, getState) => {
    try {
      const { user } = await signInWithEmailAndPassword(auth, email, password);
      const { uid, displayName, photoURL } = user;

      dispatch(
        updateUserProfile({
          userId: uid,
          name: displayName,
          userEmail: email,
          avatURL: photoURL,
        })
      );
    } catch (error) {
      console.log(error);
    }
  };

export const authSignOut = () => async (dispatch, getState) => {
  await signOut(auth);

  dispatch(authLogOut());
};

export const authStateChangeUser = () => async (dispatch, getState) => {
  onAuthStateChanged(auth, user => {
    if (user) {
      const userUpdateProfile = {
        name: user.displayName,
        userId: user.uid,
        userEmail: user.email,
        avatURL: user.photoURL,
      };

      dispatch(updateUserProfile(userUpdateProfile));
      dispatch(authSetChange({ stateChange: true }));
    }
  });
};

export const changeAvatarPhotoURL = photoDir => async (dispatch, getState) => {
  try {
    const user = auth.currentUser;
    const avURL = photoDir ? await uploadPhoto(photoDir, user.uid) : null;

    await updateProfile(user, { photoURL: avURL });
    await dispatch(changeAvatarPhoto({ avatURL: avURL }));
  } catch (error) {
    console.log(error);
  }
};
