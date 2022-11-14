
import { useForm } from "react-hook-form"
interface LoginForm {
    username : string;
    password : string;
    email : string;
    errors: string;
}

export default function Forms(){
    const { register, handleSubmit, 
        formState:{errors}, // DOM에 에러 메시지를 바로 노출할 수 있음
        watch,              // 특정 input field만 감시할 수 있음
        setError,           // 임의로 에러를 설정할 수 있음
        setValue,           // 값 설정
        reset               // 초기화
    } = useForm<LoginForm>({mode:"onChange"});
    const onValid = (data:LoginForm) => {
        console.log("Im valid bby");
        setError("errors", {message: "backend is offline sorry"}); // 이런식으로 form에 대한 에러 외에 전역 에러를 설정할 수 있다
        reset();
    }
    const onInvalid = (errors:FieldErrors) =>{
        console.log(errors)
    }

    return <form onSubmit={handleSubmit(onValid, onInvalid)}>
        <input {...register("username", 
            {required :"Username is required", 
            minLength: {
                message : "The username should be longer than 5 chars",
                value: 5
            }
        })} type="text" placeholder="Username" />
        <input {...register("email", {required :"email is required"})} type="email" placeholder="Email" />
        {errors.email?.message}
        <input {...register("password", {required :"password is required"})} type="password" placeholder="Password" />
        <span>{errors.errors?.message}</span>
        <input type="submit" value="Create Account"/>
    </form>
}