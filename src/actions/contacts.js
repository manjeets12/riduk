'use strict';

import {
 GET_CONTACTS_SUCCESS,
 GET_CONTACTS_ERROR,
} from 'src/common/constants'


export const getContactsSuccess= function(data){
  	return{
        type:GET_CONTACTS_SUCCESS,
        data,
    }
}

export const getContactsError= function(){
  	return{
        type:GET_CONTACTS_ERROR,
    }
}