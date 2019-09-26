export interface UsersArray{
    email: string
    firstname: string
    id: number
    imageProfile: string
    password: string
    secondname: string
}

export interface BooksArray{
    amount: string
    choosePhoto: string
    description: string
    price: string
    title: string
    _id: number
}

export interface DataModalBooks{
    title: string
    editBook?: boolean
    data?: any
} 

export interface EditBook{
    amount: string
    price: string
    choosePhoto: string
    description: string
    title: string
    _id: number
}
