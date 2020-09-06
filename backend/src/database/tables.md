# Tables

### User
- name: string
- cpf: string
- whatsapp: string
- email: string
- password: string
- type: string (helper || helped)

### item
- name: string
- image: string

### requests
- title: string
- description: string
- status: integer
- latitude: string
- longitude: string
- owner_id: integer
- item_id: integer

### requests_helpers
- request_id: integer
- user_id: integer
- status: integer
