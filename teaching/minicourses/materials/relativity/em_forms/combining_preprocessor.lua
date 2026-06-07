-- Christian von Schultz, Dec 9 '13

function minornil(a, b)
   if a == nil and b == nil then
      return nil
   elseif a == nil then
      return b
   elseif b == nil then
      return a
   else
      return math.min(a, b)
   end
end

function findfirstcombining(line, n)
   local a = string.find(line, "\204[\128-\191]", n)     -- From U0300,
   local b = string.find(line, "\205[\128-\175]", n)     -- to U036F.
   a = minornil(a, b)
   b = string.find(line, "\226\131[\144-\176]", n) -- U20D0 to U20F0
   a = minornil(a, b)
   b = string.find(line, "\225\183[\128-\191]", n) -- U1DC0 to U1DFF
   a = minornil(a, b)
   return a
end

function is_utf8_continuation(byte)
   return byte < 191 and byte > 127
end

function find_next_utf8_char(str, n)
   while str:byte(n) ~= nil and is_utf8_continuation(str:byte(n)) do
      n = n + 1
   end
   return n
end

function combining_iter(str)
   local n = 0
   return function ()
      n = (n ~= nil) and findfirstcombining(str, n + 1)
      return n
   end
end

function dobuffer(line)
   local n1 = 0
   local t = {}
   for n2 in combining_iter(line) do
      if n2 > n1 then
         local n3 = n2
         repeat
            n3 = n3 - 1
         until not is_utf8_continuation(line:byte(n3))
         table.insert(t, string.sub(line, n1, n3 - 1))
         n1 = find_next_utf8_char(line, n2 + 1)
         local comb = {}
         table.insert(comb, "\\" .. string.sub(line, n2, n1 - 1) .. "{")
         table.insert(comb, string.sub(line, n3, n2 - 1) .. "}")
         n2 = findfirstcombining(line, n1)
         while n2 == n1 do
            n1 = find_next_utf8_char(line, n2 + 1)
            table.insert(comb, 1, "\\" .. line:sub(n2, n1 - 1) .. "{")
            table.insert(comb, "}")
            n2 = findfirstcombining(line, n1)
         end
         table.insert(t, table.concat(comb))
      end
   end
   table.insert(t, string.sub(line, n1))
   return table.concat(t)
end

luatexbase.add_to_callback("process_input_buffer",
                           dobuffer, "combining_preprocessor", 1)
