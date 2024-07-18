const getState = ({ getStore, getActions, setStore }) => {
    return {
        store: {
            apiURL: 'http://127.0.0.1:5000',
            currentUser: null,
            access_token: null,
            profile: null,
        },
        actions: {
            signUp: async (datos) => {
                try {
                    const { apiURL } = getStore()
                    const response = await fetch(`${apiURL}/api/sign-up`, {
                        method: 'POST',
                        body: JSON.stringify(datos),
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    })

                    const data = await response.json()

                    //console.log(data)

                    return data

                } catch (error) {
                    console.log(error)
                }
            },
            signIn: async (datos) => {
                try {
                    const { apiURL } = getStore()
                    const response = await fetch(`${apiURL}/api/sign-in`, {
                        method: 'POST',
                        body: JSON.stringify(datos),
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    })

                    const data = await response.json()

                    //console.log(data)
                    const { access_token, currentUser, status, message } = data

                    // guardando en el store
                    setStore({ currentUser, access_token })

                    // guardando en el navegador
                    sessionStorage.setItem('access_token', access_token)
                    sessionStorage.setItem('currentUser', JSON.stringify(currentUser))

                    return { status, message }

                } catch (error) {
                    console.log(error)
                }
            },
            signOut: () => {
                if (sessionStorage.getItem('access_token')) {
                    setStore({
                        access_token: null,
                        currentUser: null
                    })
                    sessionStorage.removeItem('access_token')
                    sessionStorage.removeItem('currentUser')
                }
            },
            checkCurrentUser: () => {
                console.log("Verificando usuario")
                if (sessionStorage.getItem('access_token')) {
                    setStore({
                        access_token: sessionStorage.getItem('access_token'),
                        currentUser: JSON.parse(sessionStorage.getItem('currentUser'))
                    })
                }
            },
            getProfile: () => {
                const { apiURL, access_token } = getStore()
                console.log(access_token)
                fetch(`${apiURL}/api/profile`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${access_token}`
                    }
                })
                    .then((response) => response.json())
                    .then((datos) => {
                        console.log(datos)
                        setStore({ profile: datos })
                    })
                    .catch((error) => console.log(error))
            },
            updateProfile: async (datos) => {
                try {
                    const { apiURL, access_token } = getStore()
                    const response = await fetch(`${apiURL}/api/profile`, {
                        method: 'PUT',
                        body: JSON.stringify(datos),
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${access_token}`
                        }
                    })

                    const data = await response.json()
                    console.log(data)
                    setStore({ profile: data.profile })
                    return { status: data.status, message: data.message }

                } catch (error) {
                    console.log(error)
                }

            },

        }
    }
}

export default getState