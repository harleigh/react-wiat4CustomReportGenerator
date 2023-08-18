export function PrettyDisplay({fileContents}){

    if(fileContents===""){return;}
        
        /**
         * Split each row by new line, then stick each entry into its own
         * row--if we want to, later, we can make pretty columns too
         */
        const rows = fileContents.split('\n').map( (v,idx) => {
            return ( 
                <tr key={idx}>
                    <th>{v}</th>
                    
                </tr>)
            }
        );

        return (
            <table>
                <tbody>
                    {rows}
                </tbody>
            </table>
        )
}//end pretty display