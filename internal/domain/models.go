package domain

type Collection struct {
	ID        int    `json:"id" db:"collection_id"`
	Name      string `json:"name" db:"name" binding:"required"`
	IconName  string `json:"iconName" db:"icon_name" binding:"required"`
	IconColor string `json:"iconColor" db:"icon_color" binding:"required"`
}
