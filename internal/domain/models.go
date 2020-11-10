package domain

type Collection struct {
	ID        int    `json:"id" db:"id"`
	Name      string `json:"name" db:"name"`
	IconName  string `json:"iconName" db:"icon_name"`
	IconColor string `json:"iconColor" db:"icon_color"`
}
