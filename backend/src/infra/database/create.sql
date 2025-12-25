
CREATE TABLE IF NOT EXISTS todos
(
    todo_id character varying(100),
    title character varying(50),
    description character varying(100),
    priority character varying(150),
    completed boolean,
    tag character varying(50),
    date timestamp,
    PRIMARY KEY (todo_id)
);

