from passlib.context import CryptContext

pwd_context = CryptContext(
    schemes=["bcrypt"],
    deprecated="auto"
)

def hash_password(password):

    safe_password = str(password)[:72]

    return pwd_context.hash(
        safe_password
    )

def verify_password(
    plain_password,
    hashed_password
):

    safe_password = str(
        plain_password
    )[:72]

    return pwd_context.verify(

        safe_password,

        hashed_password

    )