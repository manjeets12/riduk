package com.riduk;

import android.app.Application;

import com.facebook.react.ReactApplication;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;

import io.invertase.firebase.RNFirebasePackage; //firebase
import com.reactnative.ivpusic.imagepicker.PickerPackage; //for image uploading
import com.magus.fblogin.FacebookLoginPackage;  //fb login
//import com.airbnb.android.react.maps.MapsPackage; //airbnb maps package
import co.apptailor.googlesignin.RNGoogleSigninPackage; //googgle login
import com.rt2zz.reactnativecontacts.ReactNativeContacts; //contatcs api

import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
          new RNFirebasePackage(),
          new PickerPackage(),
          new FacebookLoginPackage(),
          new RNGoogleSigninPackage(),
          new ReactNativeContacts()
          //new MapsPackage()

      );
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
  }
}
