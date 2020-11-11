package domain

type Collection struct {
	ID        int    `json:"id" db:"id"`
	Name      string `json:"name" db:"name"`
	IconName  string `json:"iconName" db:"icon_name"`
	IconColor string `json:"iconColor" db:"icon_color"`
}

type User struct {
	ID        int    `json:"id" db:"id"`
	Name      string `json:"name" db:"name"`
	Email     string `json:"email" db:"email"`
	Password  string `json:"-" db:"password"`
	Admin     bool   `json:"-" db:"admin"`
	IconName  string `json:"iconName" db:"icon_name"`
	IconColor string `json:"iconColor" db:"icon_color"`
	JWT       string `json:"jwt"`
}
