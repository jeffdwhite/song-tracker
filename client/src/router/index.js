import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Songs from '@/components/Songs'
import CreateSong from '@/components/CreateSong'
import ViewSong from '@/components/ViewSong'
import EditSong from '@/components/EditSong'
import SignIn from '@/components/SignIn'
import CreateUser from '@/components/CreateUser'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: HelloWorld
    },
    {
      path: '/Songs',
      name: 'songs',
      component: Songs
    },
    {
      path: '/Songs/Create',
      name: 'songs-create',
      component: CreateSong
    },
    {
      path: '/Songs/:uriAddress',
      name: 'song',
      component: ViewSong
    },
    {
      path: '/Songs/:uriAddress/Edit',
      name: 'song-edit',
      component: EditSong
    },
    {
      path: '/SignIn',
      name: 'sign-in',
      component: SignIn
    },
    {
      path: '/CreateUser',
      name: 'create-user',
      component: CreateUser
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
