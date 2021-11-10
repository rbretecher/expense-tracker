package domain

import (
	"encoding/json"
	"time"
)

type Project struct {
	ID        int    `json:"id" db:"id"`
	Name      string `json:"name" db:"name"`
	IconName  string `json:"iconName" db:"icon_name"`
	IconColor string `json:"iconColor" db:"icon_color"`
	Count     int    `json:"count"`
}

type User struct {
	ID        int    `json:"id" db:"id"`
	Name      string `json:"name" db:"name"`
	Email     string `json:"email" db:"email"`
	Password  string `json:"-" db:"password"`
	Admin     bool   `json:"admin" db:"admin"`
	IconName  string `json:"iconName" db:"icon_name"`
	IconColor string `json:"iconColor" db:"icon_color"`
	JWT       string `json:"jwt,omitempty"`
}

type UserHasProject struct {
	UserID    int     `json:"userId" db:"user_id"`
	ProjectID int     `json:"projectId" db:"project_id"`
	Weight    float32 `json:"weight" db:"weight"`
}

type ProjectUser struct {
	User
	Weight float32 `json:"weight" db:"weight"`
}

type Category struct {
	ID        int    `json:"id" db:"id"`
	Name      string `json:"name" db:"name"`
	IconName  string `json:"iconName" db:"icon_name"`
	IconColor string `json:"iconColor" db:"icon_color"`
}

type Expense struct {
	ID           int       `json:"id" db:"id"`
	ProjectID    int       `json:"projectId" db:"project_id"`
	CategoryID   int       `json:"categoryId" db:"category_id"`
	PaidByUserID int       `json:"paidByUserId" db:"paid_by_user_id"`
	Name         string    `json:"name" db:"name"`
	Date         time.Time `json:"date" db:"date"`
	Price        float32   `json:"price" db:"price"`
}

func (e *Expense) MarshalJSON() ([]byte, error) {
	type Alias Expense
	return json.Marshal(&struct {
		Date string `json:"date"`
		*Alias
	}{
		Date:  e.Date.Format("2006-01-02"),
		Alias: (*Alias)(e),
	})
}
