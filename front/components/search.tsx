import { Button, Card, FormControl, FormLabel, Grid, GridItem, Input, useColorModeValue } from "@chakra-ui/react"
import { useState } from "react"





const Search = (props:any) => {

    const [search, setSearch] = useState({
        name: 'Avengers',
        start: '2000-01-01',
        end: '2023-01-01',
    })

    const onChange = (e:any) => {
        let name = e.target.name;
        let value = e.target.value;
        setSearch(prev => ({...prev, [name]: value}))
    }

    const Click = () => {
        return props.onChange(search)
    }


    return <Card m={20} p={10} bg={useColorModeValue('gray.200', 'gray.700')}>
                <Grid templateColumns='repeat(12, 1fr)' gap={6}>
                    <GridItem colSpan={{
                        md: 4,
                        sm:12
                    }}>
                        <FormControl>
                            <FormLabel>Nom du films</FormLabel>
                            <Input onChange={onChange} name="name" type="text" placeholder="50 nuance de grey..." />
                        </FormControl>
                    </GridItem>
                    <GridItem colSpan={{
                        md: 3,
                        sm:12
                    }}>
                        <FormControl>
                            <FormLabel>Date de début</FormLabel>
                            <Input onChange={onChange} name="start" type="date" />
                        </FormControl>
                    </GridItem>
                    <GridItem colSpan={{
                        md: 3,
                        sm:12
                    }}>
                        <FormControl>
                            <FormLabel>Date de début</FormLabel>
                            <Input onChange={onChange} name="end" type="date" />
                        </FormControl>
                    </GridItem>
                    <GridItem colSpan={{
                        md: 2,
                        sm:12
                    }}>
                        <Button onClick={Click} mt={8} w={'full'}>Rechercher</Button>
                    </GridItem>
                </Grid>
            </Card>
    
}

export default Search